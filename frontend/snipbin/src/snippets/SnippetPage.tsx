import { useLoaderData } from "react-router-dom";
import { SnippetModel } from "../models/snippetModel";
import CodeSnippet from "./snippet_components/CodeSnippet";
import { CopyCodeButton } from "./snippet_components/SnippetCards";

// export default function SnippetPage({snippet}: {snippet: SnippetModel}) {
export default function SnippetPage() {

  const snippet: SnippetModel = useLoaderData()
  const {
    title,
    description,
    example,
    summary,
    language_fk,
  }: SnippetModel = snippet

  return (<>
    <div className="px-pc mb-24">
      <div className="text-5xl leading-15 pb-3.5 w-3/4">{title}</div>
      <div className="text-base text-gray-400 pb-3.5 w-6/7">{description}</div>
      <div id="code-summary" className="relative bg-gray-custom flex px-3 mt-3.5 mb-7 justify-between items-start rounded-xl">
        <CodeSnippet codeBlock={summary} languageId={language_fk} />
        <div className="pt-4">
          <CopyCodeButton codeToCopy={summary} />
        </div>
      </div>
      <div className="text-xl pb-3.5">Example:</div>
      <div id="code-summary" className="relative bg-gray-custom flex px-3 justify-between items-start rounded-xl">
        <CodeSnippet codeBlock={example} languageId={language_fk} />
        <div className="pt-4">
          <CopyCodeButton codeToCopy={example} />
        </div>
      </div>
    </div>
  </>)
}