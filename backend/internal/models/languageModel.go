package models

type Language struct {
	LanguageID   uint   `gorm:"primaryKey"`
	LanguageName string `gorm:"column:language_name"`
}

var Languages = map[string]*Language{
	"javascript": {LanguageID: 1, LanguageName: "Javascript"},
	"python":     {LanguageID: 2, LanguageName: "Python"},
	"go":         {LanguageID: 3, LanguageName: "Golang"},
	"rust":       {LanguageID: 4, LanguageName: "Rust"},
}
