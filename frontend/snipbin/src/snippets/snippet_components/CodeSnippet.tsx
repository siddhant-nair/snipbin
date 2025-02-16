import { Highlight } from "prism-react-renderer"

export default function CodeSnippet({ codeBlock, languageId}: { codeBlock: string, languageId: number}) {
  const languageMap: { [key: number]: string } = {
    1: "js",
    2: "python",
    3: "go",
    4: "rust",
    5: "cpp",
  }

  function toBeHighlighted(categories: string[]): Object {
    const orangeHighlight = ["method", "function", "keyword"]
    const greenHighlight = ["property", "class-name", "namespace"]
    // const blueHighlight = ["builtin"]
    // if (orangeHighlight.includes)
    

    for (let i = 0; i < categories.length; i++) {

      if (orangeHighlight.includes(categories[i])) {
        return { color: "#F58219" }
      } else if (greenHighlight.includes(categories[i])) {
        return { color: "#f080a0" }
        return { color: "#F6afef" }
      }
    }

    return {}
  }

  return (
    <Highlight code={codeBlock} language={languageMap[languageId]}>
      {
        ({ tokens, getTokenProps }) => (
          <pre style={{fontFamily: '"DM Mono", serif', scrollbarGutter: "unset"}} 
          // !whitespace-normal break-normal
            className="
            whitespace-pre break-words overflow-hidden
            scroll-auto py-4">
            {tokens.map((line, i) => (
              <div key={i}>
                {line.map((token, key) => { 
                  // console.log(token.types)
                  return (
                    <span key={key} 
                    {...getTokenProps({ token })}
                    style={toBeHighlighted(token.types)}
                    />
                  ) })}
              </div>
            )
          )}
          </pre>
        )
      }
    </Highlight>
  )
}
