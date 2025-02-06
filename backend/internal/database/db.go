package database

import (
	// "gorm.io/driver/sqlite" // Sqlite driver based on CGO
	// "github.com/glebarez/sqlite" // Pure go SQLite driver, checkout https://github.com/glebarez/sqlite for details
	"github.com/siddhant-nair/snipbin/internal/models"
	"gorm.io/gorm"
)

type UserRepo struct {
	db *gorm.DB
}

func NewUserRepo(db *gorm.DB) *UserRepo {
	return &UserRepo{db: db}
}

func (ur *UserRepo) GetLanguageArray(language string) ([]*models.Snippet, error) {
	var snippetList []*models.Snippet

	res := ur.db.Where(
		&models.Snippet{
			LanguageID: models.Languages[language].LanguageID,
		}).Find(&snippetList)

	return snippetList, res.Error
}
