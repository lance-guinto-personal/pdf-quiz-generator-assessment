"use client";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React, { useState } from "react";
import toast from "react-hot-toast";
import Quizzes from "./quizForm";
import { Question } from "@/lib/utils";

function SubmissionForm() {
	const [fileID, setFileID] = useState<string | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);

	// Show file upload component by default
	const [showFileUploadCmponent, setShowFileUploadCmponent] = useState(true);
	// Hide Quizzes component by default
    const [showQuizComponent, setShowQuizComponent] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
			if (file.type == "application/pdf") {
				// Send file to /api/upload-file in formData file format
				const formData = new FormData();
				formData.append("file", file);

				toast.promise(
					fetch("/api/upload-file", {
						method: "POST",
						body: formData
					}).then( async (response) => {
						const data = await response.json();
						if (response.status === 200) {
							setFileID(data.fileID);
							setQuestions(data.questions);
							// Show the quiz component when questions are ready
							setShowQuizComponent(true);
							// Hide the file upload bar when questions are ready
							setShowFileUploadCmponent(false);
							return `File ${file.name} uploaded successfully`;
						} else {
							throw new Error("Failed to upload file");
						}
					}),
					{
						loading: `Uploading ${file.name}...`,
						success: (message) => message,
						error: (err) => err.message || "Failed to upload file"
					}
				);
			} else {
				toast.error("Incorrect file. Only PDFs can be uploaded.")
			}
        }
    }

  	return (
		<div>
			{showFileUploadCmponent && 
				<Card className="w-full max-w-sm">
					<CardHeader>
						<CardTitle>Generate a Quiz from a PDF!</CardTitle>
						<CardDescription>Click the input box below to upload a PDF file</CardDescription>
					</CardHeader>
					<CardContent>
						<Input type="file" name="file" accept=".pdf" onChange={handleFileChange}/>
					</CardContent>
				</Card>
			}
			{showQuizComponent && <Quizzes questions={questions}/>}
		</div>
  	);
}

export default SubmissionForm;
