package models

type Language struct {
	LanguageID   uint   `json:"language_id" gorm:"primaryKey"`
	LanguageName string `json:"language_name" gorm:"column:language_name;unique"`
}

// var Languages = map[string]*Language{
// 	"javascript": {LanguageID: 1, LanguageName: "Javascript"},
// 	"python":     {LanguageID: 2, LanguageName: "Python"},
// 	"golang":     {LanguageID: 3, LanguageName: "Golang"},
// 	"rust":       {LanguageID: 4, LanguageName: "Rust"},
// }

func GetLanguageList() map[string]*Language {
	return map[string]*Language{
		"javascript": {LanguageID: 1, LanguageName: "Javascript"},
		"python":     {LanguageID: 2, LanguageName: "Python"},
		"go":         {LanguageID: 3, LanguageName: "Go"},
		"rust":       {LanguageID: 4, LanguageName: "Rust"},
	}
}
