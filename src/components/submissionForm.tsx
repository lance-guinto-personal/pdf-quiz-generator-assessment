"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// export default async function SubmissionForm() {
// 	async function action(formData: FormData) {
// 		"use server";
// 		const file = formData.get("file") as File;
// 		console.log(file);

// 		if (!file || file.size === 0) {
// 			return { error: "No file uploaded." }
// 		}

// 		const data = await file.arrayBuffer();
// 		await fs.writeFile(`${process.cwd}/tmp/${file.name}`, Buffer.from(data));
// 	} 

// 	return (
// 		<div>
// 		<form action={action}>
// 			<Input type="file" name="file" accept=".pdf"/>
// 			<Button>Upload</Button>
// 		</form>
// 		</div>
// 	);
// }


import React from "react";
import toast from "react-hot-toast";

function SubmissionForm() {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            toast.success(`File ${file.name} uploaded successfully`);
        }
    }
	
  	return (
		<div>
			<Input type="file" name="file" accept=".pdf" onChange={handleFileChange}/>
			{/* <input
				type="radio"
				name="quiz_generator_tabs"
				className="tab"
				aria-label="Educator"
				defaultChecked
			/>
			<div className="tab-content bg-base-100 border-base-300 p-6">
				<fieldset className="fieldset">
				<legend className="fieldset-legend">Pick a file</legend>
				<input type="file" className="file-input" onChange={handleFileChange} />
				<label className="label">Max size 32MB</label>
				</fieldset>
			</div>

			<input
				type="radio"
				name="quiz_generator_tabs"
				className="tab"
				aria-label="Student"
			/>
			<div className="tab-content bg-base-100 border-base-300 p-6">
				Tab content 2
			</div> */}
		</div>
  	);
}

export default SubmissionForm;
