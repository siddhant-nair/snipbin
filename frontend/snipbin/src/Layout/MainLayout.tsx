import { Outlet, useLoaderData, useParams } from "react-router-dom"
import SearchBar from "./Components/SearchBar"
import { useCallback, useEffect, useState } from "react"
import { SnippetApis, SnippetModel } from "../models/snippetModel"

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
      <div className="flex w-full">
        <div id="some-logo"></div>
        <SearchBar setSearchString={searchStringSetter} />
        <div id="language-switcher"></div>
      </div>
    </header>
    <Outlet context={snippetList}/>
  </>
  
}