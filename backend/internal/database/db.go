package database

import (
	// "gorm.io/driver/sqlite" // Sqlite driver based on CGO
	// "github.com/glebarez/sqlite" // Pure go SQLite driver, checkout https://github.com/glebarez/sqlite for details

	"github.com/siddhant-nair/snipbin/internal/models"
	"gorm.io/gorm"
)

type UserRepo struct {
	db            *gorm.DB
	initLanguages map[string]*models.Language
}

func NewUserRepo(db *gorm.DB) *UserRepo {
	return &UserRepo{db: db,
		initLanguages: models.Languages,
	}
}

func (ur *UserRepo) GetLanguageArray(language string) ([]*models.Snippet, error) {
	var snippetList []*models.Snippet

	res := ur.db.Where(
		&models.Snippet{
			LanguageID: ur.initLanguages[language].LanguageID | 1,
		}).
		Find(&snippetList)

	return snippetList, res.Error
}

type trial = []*models.SnippetxProcessedSnippet

// type trial = []*models.ProcessedSnippet

func (ur *UserRepo) GetProcessedArrays(language string) (trial, error) {
	var processedSnippets *trial

	// res := ur.db.	json.NewEncoder(w).Encode(h.languageArray)

	// 	Model(&models.Snippet{}).
	// 	Joins("inner join processed_snippets on snippets.snippet_id = processed_snippets.snippet_id").
	// 	Where(&models.Snippet{
	// 		LanguageID: models.Languages[language].LanguageID,
	// 	}).
	// 	Scan(&processedSnippets)

	res := ur.db.Table("processed_snippets").
		// Preload("snippets").
		Joins("INNER JOIN snippets ON snippets.snippet_id = processed_snippets.processed_snippet_id AND snippets.language_id = ?", ur.initLanguages[language].LanguageID).
		Scan(&processedSnippets)

		// Joins("NATURAL JOIN snippets ON snippets.snippet_id = processed_snippets.processed_snippet_id").
	return *processedSnippets, res.Error
}
