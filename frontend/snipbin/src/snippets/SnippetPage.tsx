import { useEffect, useState } from "react";
import SnippetCards from "./snippet_components/SnippetCards";
import { SnippetApis, SnippetModel } from "../models/snippetModel";
import { useOutletContext, useParams } from "react-router-dom";


export default function SnippetPage() {
	const [snippetList, setSnippetList] = useState<SnippetModel[]>([])
	const snippetApis = new SnippetApis()

	const urlParams = useParams()
	const searchString: string = useOutletContext()

	async function setSnippetData(toSearch: string) {
		let data: SnippetModel[];
		try {
			if (toSearch == "") {
				data = await snippetApis.fetchSnippets(urlParams.language!)
			}else{ 
				data = await snippetApis.fetchSearchResult(urlParams.language!, toSearch)
			}
			setSnippetList(data)
		} catch (err) {
			console.log("error fetching snippets", err)
		}
	}

	useEffect(() => {
		setSnippetData(searchString.trim())
		
	}, [searchString])

	return (<>
		{console.log(searchString)}
		<div className="flex justify-center">

			{/* <div className="w-full grid grid-cols-2 place-items-center px-16 gap-x-6 gap-y-6"> */}
			<div className="w-fit grid grid-cols-3 place-items-center px-3 gap-x-6 gap-y-6">
				{
					Boolean(snippetList.length) &&
					snippetList.map((e: SnippetModel, i: number) =>
						<SnippetCards key={i} title={e.title} summary={e.summary} languageId={e.language_fk} />
					)
				}
			</div>
		</div>
	</>
	)
}
