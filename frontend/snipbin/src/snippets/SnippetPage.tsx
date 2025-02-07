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
		{
			Boolean(snippetList.length) && 
			<SnippetCards title={snippetList[0].title} summary={snippetList[0].summary} />
		}
	</>
	)
}
