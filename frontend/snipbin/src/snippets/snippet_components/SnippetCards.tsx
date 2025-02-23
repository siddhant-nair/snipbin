import { CheckCheck, Copy, Maximize2 } from "lucide-react"
import CodeSnippet from "./CodeSnippet"
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import slugify from "../../util/slugify";
import { DisplayStringContext } from "../../context/searchBarContext";

export default function SnippetCards({
  title,
  summary,
  languageId, }:
  {
    title: string,
    summary: string,
    languageId: number
  }
): JSX.Element {

  const navigate = useNavigate()
  const { setDisplayString } = useContext(DisplayStringContext)
  function openCard(){
    setDisplayString("")
    navigate(slugify(title))
  }

  return (
    // <div className="w-[100%] max-w-[40rem] aspect-[3.75] bg-gray-custom p-4 rounded-2xl flex flex-col gap-3">
    <div className="min-w-[10rem] w-full aspect-[2.25] bg-gray-custom p-4 rounded-2xl flex flex-col gap-3">
      <div id="card-header" className="flex h-14 px-2 items-center justify-between">
        <div id="card-title" className="w-2/3">
          {title}
        </div>
        <div id="card-expand" onClick={openCard} className="cursor-pointer">
          <Maximize2 />
        </div>
      </div>
      <div id="code-summary" className="relative bg-black-custom 
        flex px-3 h-4/5 justify-between items-center rounded-xl">
        <CodeSnippet codeBlock={summary} languageId={languageId} />
        <CopyCodeButton codeToCopy={summary} />
        {/* {summary} */}
      </div>
    </div>
  )
}

export function CopyCodeButton({ codeToCopy }: { codeToCopy: string }) {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);

    setCopiedCode(true);

    setTimeout(() => {
      setCopiedCode(false);
    }, 2000);
  };
  return (
    <button
      // className="w-1/4 absolute top-0 right-0 flex justify-end pr-6 pt-3"
      className={`px-3 opacity-50 ${copiedCode ? "text-green-400" : "#f4f4f4"}`}
      onClick={() => handleCopyCode(codeToCopy)}
    // style={{ color: `${copiedCode ? "green" : "#f4f4f4"}` }}
    >
      {copiedCode ?
        <CheckCheck /> :
        <Copy className="rotate-y text-right" />
      }
    </button>
  );
}