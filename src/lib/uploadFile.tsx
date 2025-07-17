import openai from '@/lib/openai';
import fs from 'fs';
import path from 'path';
import os from 'os';

export default async function uploadFile(file: File): Promise<string> {
    let tempFilePath: string | null = null;
    
    try {
        // Validate file
        if (!file) {
            throw new Error('No file provided');
        }

        // Check file size (optional: limit to 25MB for OpenAI)
        const maxSize = 25 * 1024 * 1024; // 25MB
        if (file.size > maxSize) {
            throw new Error('File too large. Maximum size is 25MB');
        }

        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Save the file temporarily on disk
        tempFilePath = path.join(os.tmpdir(), file.name);
        fs.writeFileSync(tempFilePath, buffer);

        // Create an fs.ReadStream from the file
        const readStream = fs.createReadStream(tempFilePath);

        // Upload to OpenAI
        const uploadedFile = await openai.files.create({
            file: readStream,
            purpose: 'user_data',
        });

        return uploadedFile.id;

    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    } finally {
        // Clean up temporary file
        if (tempFilePath && fs.existsSync(tempFilePath)) {
            try {
                fs.unlinkSync(tempFilePath);
            } catch (cleanupError) {
                console.error('Error cleaning up temp file:', cleanupError);
            }
        }
    }
}