import { Outlet, useLoaderData, useNavigate, useParams } from "react-router-dom"
import SearchBar from "./Components/SearchBar"
import { useEffect, useState } from "react"
import { SnippetApis, SnippetModel } from "../models/snippetModel"
import { ArrowLeftRight } from "lucide-react"
import { DisplayStringContext, SearchStringContext } from "../context/searchBarContext"

export default function MainLayout() {

	const [searchString, setSetsearchString] = useState("")
	const data: SnippetModel[] = useLoaderData();
	const snippetApis = new SnippetApis()
	const urlParams = useParams()
	const navigate = useNavigate()
	const [snippetList, setSnippetList] = useState<SnippetModel[]>(data)
	const [displayString, setDisplayString] = useState("")
	
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
			<SearchStringContext.Provider value={setSetsearchString} >
				<header className="w-full px-pc py-7">
					<div className="flex w-full justify-between items-center">
						<div className="flex items-center w-5/9 gap-5">
							<div id="some-logo" className="size-36 bin-logo cursor-pointer"
								onClick={() => navigate('')}
							/>
							<SearchBar />
						</div>
						<a href="/">
							<div id="language-switcher" className="flex flex-col gap-3 items-center">
								<div>
									<img src={`http://localhost:8080/api/v1/media/assets/${urlParams.language}.svg`}
										className="w-15 object-fill"
										alt={urlParams.language} />
								</div>
								<ArrowLeftRight />
							</div>
						</a>
					</div>
				</header>
				<Outlet context={snippetList} />
			</SearchStringContext.Provider>
		</DisplayStringContext.Provider>
	)
}