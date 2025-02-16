import { Search } from 'lucide-react'
import { useContext } from 'react'
import debounce from '../../util/debounce'
import { DisplayStringContext, SearchStringContext } from '../../context/searchBarContext'
import { useLocation, useNavigate } from 'react-router-dom'

export default function SearchBar() {

  const { displayString, setDispayString } = useContext(DisplayStringContext);
  const setSearchString = useContext(SearchStringContext);
  const navigate = useNavigate();
  const URL = useLocation();
  const pathArray: string[] = URL.pathname.split("/").slice(1);
  // console.log(pathArray)

  function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>): void {
    setDispayString(e.target.value);
    const debounceSetState = debounce((val: string = e.target.value) => {
      setSearchString(val);
      // }, 1750)
    }, 1000)
    debounceSetState();

    if (pathArray.length > 1 && pathArray[1] != "") {
      navigate('')
    }
  }

  return (
    <div id="search-bar" className="w-full">
      <div className="h-12 w-full border-1 border-gray-600 flex items-center">
        <Search className="mx-2 text-gray-600" />
        <input
          name="search-bar"
          className="h-full w-full outline-none"
          placeholder="Search For A Snippet"
          value={displayString}
          onChange={handleSearchInput}
          autoComplete='off'
        />
      </div>
    </div>
  )
} 
