import { Search } from 'lucide-react'
import { useState } from 'react'
import debounce from '../../util/debounce'

export default function SearchBar({ setSearchString }
  : { setSearchString: (val: string) => void }
) {

  const [localSearchString, setLocalSearchString] = useState("")

  function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>): void{
    setLocalSearchString(e.target.value)
    const debounceSetState = debounce((val: string = e.target.value) => {
      setSearchString(val)
    // }, 1750)
    }, 1000)

    debounceSetState();
  }

  return (
    <div id="search-bar" className="w-full">
      <div className="h-12 w-full border-1 border-gray-600 flex items-center">
        <Search className="mx-2 text-gray-600" />
        <input
          name="search-bar"
          className="h-full w-full outline-none"
          placeholder="Search For A Snippet"
          value={localSearchString}
          onChange={handleSearchInput}
        />
      </div>
    </div>
  )
} 
