import { Maximize2 } from "lucide-react"
import CodeSnippet from "./CodeSnippet"

export default function SnippetCards({ title, summary }: { title: string, summary: string }): JSX.Element {

  return (
    <div className="w-sm h-48 bg-gray-custom p-4 rounded-2xl flex flex-col gap-3">
      <div id="card-header" className="flex h-14 px-2 items-center justify-between">
        <div id="card-title" className="w-2/3">
          {title}
        </div>
        <div id="card-expand"><Maximize2 /></div>
      </div>
      <div id="code-summary" className="bg-black-custom flex items-center px-3 h-full rounded-xl">
       <CodeSnippet codeBlock={summary}/> 
        {/* {summary} */}
      </div>
    </div>
  )
}
