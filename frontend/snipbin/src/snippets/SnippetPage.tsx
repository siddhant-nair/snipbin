import { useLoaderData } from "react-router-dom";
import { SnippetModel } from "../models/snippetModel";
import CodeSnippet from "./snippet_components/CodeSnippet";


// export default function SnippetPage({snippet}: {snippet: SnippetModel}) {
export default function SnippetPage() {

  const snippet: SnippetModel = useLoaderData()
  const {
    title,
    description,
    example,
    language_fk,
  }: SnippetModel = snippet

  return (<>
    <div>{title}</div>
    <div>{description}</div>
    <CodeSnippet codeBlock={example} languageId={language_fk}/>
  </>)
}