import { useEffect, useState } from "react";
import SnippetCards from "./snippet_components/SnippetCards";
import { SnippetApis, SnippetModel } from "../models/snippetModel";
import { useOutletContext, useParams } from "react-router-dom";


export default function SnippetPage() {
	const [snippetList, setSnippetList] = useState<SnippetModel[]>([])
	const snippetApis = new SnippetApis()

	const urlParams = useParams()
	const searchString = useOutletContext()

	// console.log(urlParams.language)

	async function setSnippetData() {
		try {
			const data = await snippetApis.fetchSnippets(urlParams.language!)
			setSnippetList(data)
			// console.log(data)
		} catch (err) {
			console.log("error fetching snippets", err)
		}
	}

	useEffect(() => {
		setSnippetData()
	}, [])

	return (<>
		{console.log("Snippet Page Rendered")}
		<div className="flex justify-center">

			{/* <div className="w-full grid grid-cols-2 place-items-center px-16 gap-x-6 gap-y-6"> */}
			<div className="w-fit grid grid-cols-3 place-items-center px-3 gap-x-6 gap-y-6">
				{
					Boolean(snippetList.length) &&
					snippetList.map((e: SnippetModel, i: number) =>
						<SnippetCards key={i} title={e.title} summary={e.summary} languageId={e.language_id} />
					)
				}
			</div>
		</div>
	</>
	)
}
