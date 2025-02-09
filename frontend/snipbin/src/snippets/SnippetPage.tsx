import { useEffect, useState } from "react";
import SnippetCards from "./snippet_components/SnippetCards";
import { SnippetApis, SnippetModel } from "../models/snippetModel";


export default function SnippetPage() {
	const [snippetList, setSnippetList] = useState<SnippetModel[]>([])
	const snippetApis = new SnippetApis()

	async function setSnippetData() {
		try {
			const data = await snippetApis.fetchSnippets()
			setSnippetList(data)
			console.log(data)
		} catch (err) {
			console.log("error fetching snippets", err)
		}
	}

	useEffect(() => {
		setSnippetData()
	}, [])
	
	return (<>
<div className="flex justify-center">

		{/* <div className="w-full grid grid-cols-2 place-items-center px-3 gap-x-6 gap-y-6"> */}
		<div className="w-fit grid grid-cols-3 place-items-center px-3 gap-x-6 gap-y-6">
			{
				Boolean(snippetList.length) &&
				snippetList.map((e: SnippetModel, i: number) =>
					<SnippetCards key={i} title={e.title} summary={e.summary} />
			)
		}
		</div>
		</div>
	</>
	)
}
