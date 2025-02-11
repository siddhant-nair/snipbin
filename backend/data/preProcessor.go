package main

import (
	"math"
	"strings"

	"github.com/siddhant-nair/snipbin/internal/models"
	"gorm.io/gorm"
)

func tokenisationCondition(r rune) bool {
	return r == '.' || r == ' ' || r == ',' || r == '`' || r == '\n'
}

func indexSnippet(snippet *models.Snippet) *models.ProcessedSnippet {

	indexMap := map[string]int{}

	for scoreIndex, v := range snippet.GetList() {
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

	// json, err := json.Marshal(indexMap)

	// if err != nil {
	// 	fmt.Println(err)
	// }

	return &models.ProcessedSnippet{
		IndexedScores: indexMap,
		SnippetID:     snippet.SnippetID,
		Snippet:       *snippet,
	}
}

func PreProcessor(db *gorm.DB) {
	var snippetList []models.Snippet
	processedList := []*models.ProcessedSnippet{}

	db.Find(&snippetList)

	for _, v := range snippetList {
		processedList = append(processedList, indexSnippet(&v))
	}

	// fmt.Println(processedList[1].IndexedScores)

	db.AutoMigrate(&models.ProcessedSnippet{})
	db.Create(processedList)

}
