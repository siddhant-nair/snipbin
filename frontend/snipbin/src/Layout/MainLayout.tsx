import { Outlet, useLoaderData, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { SnippetApis, SnippetModel } from "../models/snippetModel"
import { DisplayStringContext, SearchStringContext } from "../context/searchBarContext"
import { SearchHeader } from "./Components/SearchHeader"

export default function MainLayout() {

	const data: SnippetModel[] = useLoaderData();
	const snippetApis = new SnippetApis()
	const urlParams = useParams()

	const [searchString, setSearchString] = useState("")
	const [displayString, setDisplayString] = useState("")
	const [snippetList, setSnippetList] = useState<SnippetModel[]>(data)

	async function setSnippetData(toSearch: string) {
		try {
			let data: SnippetModel[];
			if (searchString == "") {
				data = await snippetApis.fetchAllSnippets(urlParams.language!)
			} else {
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

	return (
		<DisplayStringContext.Provider value={{ displayString, setDisplayString }} >
			<SearchStringContext.Provider value={setSearchString} >
				<SearchHeader language={urlParams.language!} />
				<Outlet context={snippetList} />
			</SearchStringContext.Provider>
		</DisplayStringContext.Provider>
	)
}