package database

import (
	// "gorm.io/driver/sqlite" // Sqlite driver based on CGO
	// "github.com/glebarez/sqlite" // Pure go SQLite driver, checkout https://github.com/glebarez/sqlite for details

	"sort"

	"github.com/siddhant-nair/snipbin/internal/models"
	"gorm.io/gorm"
)

// var languageList = map[string]*models.Language{
// 	"javascript": {LanguageID: 1, LanguageName: "Javascript"},
// 	"python":     {LanguageID: 2, LanguageName: "Python"},
// 	"golang":     {LanguageID: 3, LanguageName: "Golang"},
// 	"rust":       {LanguageID: 4, LanguageName: "Rust"},
// }

type UserRepo struct {
	db            *gorm.DB
	initLanguages map[string]*models.Language
}

func NewUserRepo(db *gorm.DB, langList map[string]*models.Language) *UserRepo {
	return &UserRepo{db: db,
		initLanguages: langList,
	}
}

func (ur *UserRepo) GetLanguageArray(language string) ([]*models.Snippet, error) {
	var snippetList []*models.Snippet
	languageID := ur.initLanguages[language].LanguageID

	res := ur.db.Where(
		&models.Snippet{
			LanguageID: languageID,
		}).
		Find(&snippetList)

	return snippetList, res.Error
}

type snippetJoin = []*models.SnippetxProcessedSnippet

func (ur *UserRepo) GetProcessedArrays(language string) (snippetJoin, error) {
	var processedSnippets *snippetJoin

	res := ur.db.Table("processed_snippets").
		// Preload("snippets").
		Joins("INNER JOIN snippets ON snippets.snippet_id = processed_snippets.processed_snippet_id AND snippets.language_id = ?", ur.initLanguages[language].LanguageID).
		Scan(&processedSnippets)

	return *processedSnippets, res.Error
}

func (ur *UserRepo) GetLanguages() []*models.Language {
	languageList := []*models.Language{}

	for _, v := range ur.initLanguages {
		languageList = append(languageList, v)
	}

	sort.Slice(languageList, func(i int, j int) bool {
		return languageList[i].LanguageID < languageList[j].LanguageID
	})

	return languageList
}
