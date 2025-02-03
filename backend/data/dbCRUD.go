package main

import (
	"encoding/json"
	"fmt"
	"os"

	"gorm.io/driver/sqlite" // Sqlite driver based on CGO

	"github.com/siddhant-nair/snipbin/internal/models"
	// "github.com/glebarez/sqlite" // Pure go SQLite driver, checkout https://github.com/glebarez/sqlite for details
	"gorm.io/gorm"
)

func createSnippetList(db *gorm.DB, language string) {
	jsonData, err := os.ReadFile("js.json")

	if err != nil {
		fmt.Println(err)
		return
	}

	var snippetBatch []map[string]interface{}

	errJson := json.Unmarshal(jsonData, &snippetBatch)

	if errJson != nil {
		fmt.Println(errJson)
		return
	}

	snippetList := []*models.Snippet{}

	for _, v := range snippetBatch {
		// fmt.Println(v)
		snippetList = append(snippetList, models.CreateSnippet(v, language))
	}

	db.Create(snippetList)
}

func createLanguageList(db *gorm.DB) {
	languageArray := []*models.Language{}

	for _, v := range models.Languages {
		languageArray = append(languageArray, v)
	}

	fmt.Println(languageArray)

	db.Create(languageArray)
}

func main() {
	db, err := gorm.Open(sqlite.Open("../internal/database/snippetsDB.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect to the database")
	}

	// insert := "language"
	insert := "snippets"

	if insert == "language" {
		db.AutoMigrate(&models.Language{})
		createLanguageList(db)
	} else if insert == "snippets" {
		db.AutoMigrate(&models.Snippet{})
		createSnippetList(db, "javascript")
	}

}
