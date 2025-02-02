package models

type Language struct {
	ID           uint   `gorm:"primaryKey"`
	LanguageName string `gorm:"column:language_name"`
}

var Languages = map[string]*Language{
	"javascript": {ID: 1, LanguageName: "Javascript"},
	"python":     {ID: 2, LanguageName: "Python"},
	"go":         {ID: 3, LanguageName: "Golang"},
	"rust":       {ID: 4, LanguageName: "Rust"},
}
