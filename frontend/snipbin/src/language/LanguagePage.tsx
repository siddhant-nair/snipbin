import { useLoaderData } from "react-router-dom"
import { LanguageModel } from "../models/snippetModel"

export default function LanguagePage() {
    const languageList: LanguageModel[] = useLoaderData()

    return (<>
    <div className="grid place-items-center h-[80vh]">
        <div className="grid grid-cols-4 place-items-center px-pc w-fit gap-24">
            {languageList.map((e: LanguageModel, i: number) =>
                <a key={i} href={e.language_name.toLowerCase()} className="block w-28">
                    <div key={i} className="size-full">
                        <img src={`http://localhost:8080/api/v1/media/assets/${e.language_name.toLowerCase()}.svg`}
                            className="w-full h-full"
                            alt="" />
                    </div>
                </a>
            )}
            </div>
        </div>
    </>)
}
