import { Outlet } from "react-router-dom"
import SearchBar from "./Components/SearchBar"
import { useCallback, useState } from "react"

export default function MainLayout() {

  const [searchString, setSetsearchString] = useState("")  

  const searchStringSetter = useCallback((val: string) => {
      setSetsearchString(val)
    }, [])

  return <>
  {/* {console.log("main layout rendered")} */}
    <header className="w-full px-pc py-7">
      <div className="flex w-full">
        <div id="some-logo"></div>
        <SearchBar searchString={searchString} setSearchString={searchStringSetter} />
        <div id="language-switcher"></div>
      </div>
    </header>
    <Outlet context={searchString}/>
  </>
  
}