import { ArrowLeftRight } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DisplayStringContext, SearchStringContext } from "../../context/searchBarContext";
import SearchBar from "./SearchBar";

export function SearchHeader({ language }: { language: string }) {

	const { setDisplayString } = useContext(DisplayStringContext);
	const setSearchString = useContext(SearchStringContext);
	const navigate = useNavigate();

	return (<header className="w-full px-pc py-7">
		<div className="flex w-full justify-between items-center">
			<div className="flex items-center w-5/9 gap-5">
				<div id="some-logo" className="size-36 bin-logo cursor-pointer"
					onClick={() => {
						navigate('')
						setSearchString('')
						setDisplayString('')
					}}
				/>
				<SearchBar />
			</div>
			<a href="/">
				<div id="language-switcher" className="flex flex-col gap-3 items-center">
					<div>
						<img src={`/api/v1/media/assets/${language}.svg`}
							className="w-15 object-fill"
							alt={language} />
					</div>
					<ArrowLeftRight />
				</div>
			</a>
		</div>
	</header>)
}
