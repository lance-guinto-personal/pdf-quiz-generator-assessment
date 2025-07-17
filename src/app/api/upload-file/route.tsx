import { NextRequest, NextResponse } from "next/server";
import uploadFile from "@/lib/uploadFile";
import questionsGenerator from "@/lib/questionsGenerator";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const fileID = await uploadFile(file);
        const questions = await questionsGenerator(fileID);
        return NextResponse.json({ questions, fileID }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }
}