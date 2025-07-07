import { useLoaderData } from "react-router-dom"
import { LanguageModel } from "../models/snippetModel"
import LanguageTile from "./language_components/LanguageTile"

export default function LanguagePage() {
    const languageList: LanguageModel[] = useLoaderData()

    return (<>
        <div className="grid place-items-center gap-y-24 pt-24">
        <div className="w-full text-center text-6xl">Pick a language</div>
            <div className="grid grid-cols-4 place-items-center px-pc w-fit gap-x-24 gap-y-15">
                {languageList.map((e: LanguageModel, i: number) => 
                    <LanguageTile key={i} languageName={e.language_name.toLowerCase()}/>
                )}
            </div>
        </div>
    </>)
}
