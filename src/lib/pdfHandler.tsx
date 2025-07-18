'use client';

import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { z } from 'zod';

export const assertFileIsPdf = z.object({
    pdf: z.custom<File>((file) => file instanceof File && file.type === "application/pdf", {
        message: "Please upload a valid PDF file",
    })
});

export async function parsePdfFile(file: File): Promise<{success: boolean; message?: string; context?: string;}> {
	const MAX_PAGES = parseInt(process.env.MAX_PDF_PAGES || "");
	const isBrowser = typeof window !== "undefined";

	// Check if it's running in a browser environment
	if (isBrowser) {
		GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
		const arrayBuffer = await file.arrayBuffer();
		const pdf = await getDocument({ data: arrayBuffer }).promise;

		// Checks if the PDF exceeds 10 pages and returns an error if it has.		
		if (pdf.numPages > MAX_PAGES) {
			return {
				success: false,
				message: 'PDF must not have more than 10 Pages.',
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
	
	return {
		success: false,
		message: 'parsePdf must be run in the browser.',
	};
}