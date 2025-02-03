package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
)

type Snippet struct {
	Title       string //4 points
	Summary     string //3 points
	Description string //2 point
	Example     string //1 point
	Tags        string //1 point
}

func (s *Snippet) getList() []string {
	return []string{
		s.Title,
		s.Summary,
		s.Description,
		s.Example,
		s.Tags,
	}
}

func preprocess(indexMap *map[string]int, snippet *Snippet) {

	for scoreIndex, v := range snippet.getList() {
		str := strings.ToLower(v)
		tokens := strings.FieldsFunc(str, func(r rune) bool {
			return r == '.' || r == ' ' || r == ',' || r == '`' || r == '\n'
		})

		for _, val := range tokens {
			for i := 0; i < len(val); i++ {
				if _, exists := (*indexMap)[val[:i]]; exists {
					(*indexMap)[val[:i]] += scoreIndex
				} else {
					(*indexMap)[val[:i]] = scoreIndex
				}
			}
		}
	}
}

func main() {
	data, err := os.ReadFile("../backend/data/js.json")

	if err != nil {
		fmt.Println("error in reading file:", err)
		return
	}

	var snippetList []*Snippet

	err = json.Unmarshal(data, &snippetList)

	if err != nil {
		fmt.Println("error in parsing file:", err)
		return
	}

	var indexMap map[string]int

	preprocess(&indexMap, snippetList[0])

	// fmt.Println(snippetList[2].Summary)
}
