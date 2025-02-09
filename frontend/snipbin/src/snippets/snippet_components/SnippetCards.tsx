import { CheckCheck, Copy, Maximize2 } from "lucide-react"
import CodeSnippet from "./CodeSnippet"
import { useState } from "react";

export default function SnippetCards({ title, summary }: { title: string, summary: string }): JSX.Element {

  return (
    // <div className="w-[100%] aspect-[5.25] bg-gray-custom p-4 rounded-2xl flex flex-col gap-3">
    <div className="w-[22rem] aspect-[2.25] bg-gray-custom p-4 rounded-2xl flex flex-col gap-3">
      <div id="card-header" className="flex h-14 px-2 items-center justify-between">
        <div id="card-title" className="w-2/3">
          {title}
        </div>
        <div id="card-expand"><Maximize2 /></div>
      </div>
      <div id="code-summary" className="relative bg-black-custom flex px-3 h-4/5 justify-between items-center rounded-xl">
       <CodeSnippet codeBlock={summary}/> 
      <CopyCodeButton codeToCopy={summary}/>
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