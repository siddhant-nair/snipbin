package models

type ProcessedSnippet struct {
	// gorm.Model
	ProcessedSnippetID uint           `json:"processed_snippet_id" gorm:"primaryKey;autoincrement"`
	IndexedScores      map[string]int `json:"indexed_scores" gorm:"serializer:json"`
	SnippetID          uint           `json:"snippet_fk"`
	Snippet            Snippet        `json:"-"`
}

// func (ps *ProcessedSnippet) ConvertToJson() {
// 	jsonData, err := json.Marshal(ps.indexedScores)

// 	if err != nil {
// 		fmt.Println("something went wrong while converting to JSON")
// 		return
// 	}

// 	ps.IndexedScores = jsonData
// }

// func (ps *ProcessedSnippet) AddIndexedScores(indexedScore map[string]int) {
// 	ps.indexedScores = indexedScore
// }
