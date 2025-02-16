import SnippetCards from "./snippet_components/SnippetCards";
import { SnippetModel } from "../models/snippetModel";
import { useOutletContext } from "react-router-dom";

export default function SnippetGrid() {

	const snippetList: SnippetModel[] = useOutletContext()

	return (<>
		{/* {console.log(searchString)} */}
		<div className="flex justify-center">

			{/* <div className="w-full grid grid-cols-2 place-items-center px-16 gap-x-6 gap-y-6"> */}
			<div className="w-full grid grid-cols-3 place-items-center px-pc gap-x-6 gap-y-6">
				{
					Boolean(snippetList.length) &&
					snippetList.map((e: SnippetModel, i: number) =>
						<SnippetCards
							key={i}
							title={e.title}
							summary={e.summary}
							languageId={e.language_fk}
						/>
					)
				}
			</div>
		</div>
	</>
	)
}
