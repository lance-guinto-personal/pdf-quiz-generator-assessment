'use client';

import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { z } from 'zod';

export const assertFileIsPdf = z.object({
    pdf: z.custom<File>((file) => file instanceof File && file.type === "application/pdf", {
        message: "Please upload a valid PDF file",
    })
});

export async function parsePdf(file: File): Promise<{success: boolean; message?: string; context?: string;}> {
	// Check if it's running in a browser environment
	const isBrowser = typeof window !== "undefined";

	if (!isBrowser) {
		return {
			success: false,
			message: 'parsePdf must be run in the browser.',
		};
	}

	GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
	const arrayBuffer = await file.arrayBuffer();
	const pdf = await getDocument({ data: arrayBuffer }).promise;

	// Checks if the PDF exceeds 10 pages and returns an error if it has.		
	if (pdf.numPages > 10) {
		return {
			success: false,
			message: 'PDF has more than 10 Pages.',
		};
	}
	
	let fullText = '';
	for (let i = 1; i <= pdf.numPages; i++) {
		const page = await pdf.getPage(i);
		const text = await page.getTextContent();
		const pageText = text.items
		.map(item => ('str' in item ? item.str : ''))
		.join(' ');
		fullText += pageText + '\n';
	}

	return {
		success: true,
		context: fullText,
	}
}