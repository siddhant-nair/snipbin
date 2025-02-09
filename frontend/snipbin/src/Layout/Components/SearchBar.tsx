import { Search } from 'lucide-react'

export default function SearchBar({ searchString, setSearchString }
    : { searchString: string, setSearchString: (val: string) => void}
) {

    // useEffect(() => {
    //     console.log(searchString)
    // }, [searchString])

    return (
  <div id="search-bar" className="w-4/8">
    <div className="h-12 w-full border-1 border-gray-600 flex items-center">
      <Search className="mx-2 text-gray-600" />
      <input
        name="search-bar"
        className="h-full w-full outline-none"
        placeholder="Search For Something" 
        value={searchString}
        onChange={e => setSearchString(e.target.value)}
        />
    </div>
  </div>
  )
} 
