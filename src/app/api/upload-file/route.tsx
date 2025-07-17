import { NextRequest, NextResponse } from "next/server";
import uploadFile from "@/lib/uploadFile";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const fileID = await uploadFile(file);
        return NextResponse.json({ fileID }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }
}