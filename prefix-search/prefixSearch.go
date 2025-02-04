package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"math"
	"os"
	"sort"
	"strings"
)

type Snippet struct {
	Title       string //4 points
	Summary     string //3 points
	Description string //2 point
	Example     string //1 point
	Tags        string //1 point
}

type Tuple[T1 any, T2 any] struct {
	first  T1
	second T2
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

func tokenisationCondition(r rune) bool {
	return r == '.' || r == ' ' || r == ',' || r == '`' || r == '\n'
}

func preprocess(snippet *Snippet) map[string]int {

	indexMap := map[string]int{}

	for scoreIndex, v := range snippet.getList() {
		str := strings.ToLower(v)
		tokens := strings.FieldsFunc(str, tokenisationCondition)

		for _, val := range tokens {
			for i := 0; i < len(val); i++ {
				if _, exists := indexMap[val[:i]]; exists {
					indexMap[val[:i+1]] += int(math.Max(1, float64(4-scoreIndex)))
				} else {
					indexMap[val[:i+1]] = int(math.Max(1, float64(4-scoreIndex)))
				}
			}
		}
	}

	return indexMap
}

func showScores(searchString string, indexList *[]map[string]int) []Tuple[int, int] {

	// scoreCard := make([]int, len(*indexList))
	scoreCard := []Tuple[int, int]{}

	for i, _ := range *indexList {
		scoreCard = append(scoreCard, Tuple[int, int]{i, 0})
	}

	searchStrTokens := strings.FieldsFunc(searchString, tokenisationCondition)

	for _, token := range searchStrTokens {
		for i, indexMap := range *indexList {
			// fmt.Println(indexMap)
			scoreCard[i].second += indexMap[token]
		}
	}

	return scoreCard
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

	indexList := []map[string]int{}

	for _, v := range snippetList {
		indexList = append(indexList, preprocess(v))
	}

	// fmt.Println(indexList)
	fmt.Println("Enter Search String")

	inputStr := bufio.NewReader(os.Stdin)
	searchStr, err := inputStr.ReadString('\n')

	scoreList := showScores(searchStr, &indexList)

	sort.Slice(scoreList, func(i, j int) bool {
		return scoreList[i].second > scoreList[j].second
	})

	for i := 0; i < 3; i++ {
		fmt.Println(snippetList[scoreList[i].first])
		fmt.Println("")
	}
	// fmt.Println(scoreList)
}
