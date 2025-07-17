import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { promises as fs } from "fs";
// import { error } from "console";

export default function Home() {
	async function action(formData: FormData) {
		"use server";
		const file = formData.get("file") as File;
		console.log(file);

		if (!file || file.size === 0) {
			return { error: "No file uploaded." }
		}

		// const data = await file.arrayBuffer();
		// await fs.writeFile
	} 

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
		<h1 className="text-4xl font-bold">PDF Quiz Generator</h1>
		<form action={action}>
			<Input type="file" name="file" accept=".pdf"/>
			<Button>Upload</Button>
		</form>
		</div>
	);
}
