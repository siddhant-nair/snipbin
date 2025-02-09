import { Highlight } from "prism-react-renderer"

export default function CodeSnippet({ codeBlock }: { codeBlock: string }) {

  function toBeHighlighted(categories: string[]): Object {
    for (let i = 0; i < categories.length; i++) {
      // console.log(categories[i])
      if (categories[i] == "method" || categories[i] == "function" || categories[i] == "keyword") {
        return { color: "#F58219" }
      }
    }
      return {}
  }

  return (
    <Highlight code={codeBlock} language="js">
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
                  console.log(token.types)
                  return (
                    <span key={key} {...getTokenProps({ token })}
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
