import { Copy, Maximize2 } from "lucide-react"
import CodeSnippet from "./CodeSnippet"
import { useState } from "react";

export default function SnippetCards({ title, summary }: { title: string, summary: string }): JSX.Element {

  return (
    <div className="w-sm h-52 bg-gray-custom p-4 rounded-2xl flex flex-col gap-3">
      <div id="card-header" className="flex h-14 px-2 items-center justify-between">
        <div id="card-title" className="w-2/3">
          {title}
        </div>
        <div id="card-expand"><Maximize2 /></div>
      </div>
      <div id="code-summary" className="bg-black-custom flex px-3 h-4/5 items-center rounded-xl">
      <CopyCodeButton codeToCopy={summary}/>
       <CodeSnippet codeBlock={summary}/> 
        {/* {summary} */}
      </div>
    </div>
  )
}

export function CopyCodeButton({ codeToCopy }: {codeToCopy: string}) {
  const [copiedCode, setCopiedCode] = useState("Copy code");

  const handleCopyCode = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);

    setCopiedCode("Copied!");

    setTimeout(() => {
      setCopiedCode("Copy code");
    }, 2000);
  };
  return (
    <button
      onClick={() => handleCopyCode(codeToCopy)}
      style={{color: `${copiedCode === "Copied!" ? "green" : "red"}`}}
    >
    <Copy className="rotate-y" />
    </button>
  );
}