"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Quizzes from "./quizForm";
import { Question } from "@/lib/utils";

function SubmissionForm() {
	const [fileID, setFileID] = useState<string | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);

	// Hide Quizzes component by default
    const [showComponent, setShowComponent] = useState(false);

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

				// const response = await fetch
				// const data = await response.json();
				// if (response.status === 200) {
				// 	// Success
				// 	setFileID(data.fileID);
				// 	toast.success(`File ${file.name} ${data.fileID} uploaded successfully.`);
				// 	setShowComponent(true);
				// } else {
				// 	toast.error("Failed to upload file.");
				// }
			} else {
				toast.error("Incorrect file. Only PDFs can be uploaded.")
			}
        }
    }

  	return (
		<div>
			<Input type="file" name="file" accept=".pdf" onChange={handleFileChange}/>
			{showComponent && <Quizzes questions={questions}/>}
		</div>
  	);
}

export default SubmissionForm;
