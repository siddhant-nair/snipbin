import { Outlet, useLoaderData, useParams } from "react-router-dom"
import SearchBar from "./Components/SearchBar"
import { useCallback, useEffect, useState } from "react"
import { SnippetApis, SnippetModel } from "../models/snippetModel"
import { ArrowLeftRight } from "lucide-react"

export default function MainLayout() {

	const [searchString, setSetsearchString] = useState("")

	const searchStringSetter = useCallback((val: string) => {
		setSetsearchString(val)
	}, [])


	const data: SnippetModel[] = useLoaderData();
	const snippetApis = new SnippetApis()
	const urlParams = useParams()

	const [snippetList, setSnippetList] = useState<SnippetModel[]>(data)

	async function setSnippetData(toSearch: string) {
		try {
			let data: SnippetModel[];
			if (searchString == "") {
				data = await snippetApis.fetchSnippets(urlParams.language!)
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

	return <>
		{/* {console.log("main layout rendered")} */}
		<header className="w-full px-pc py-7">
			<div className="flex w-full justify-between items-center">
				<div className="flex items-center w-5/9 gap-5">
					<div id="some-logo" className="size-18 bg-white"></div>
					<SearchBar setSearchString={searchStringSetter} />
				</div>
				<a href="/">
					<div id="language-switcher" className="flex flex-col gap-3 items-center">
						<div>
							<img src={`http://localhost:8080/api/v1/media/assets/${urlParams.language}.svg`}
								className="w-18 object-fill"
								alt={urlParams.language} />
						</div>
						<ArrowLeftRight />
					</div>
				</a>
			</div>
		</header>
		<Outlet context={snippetList} />
	</>

}