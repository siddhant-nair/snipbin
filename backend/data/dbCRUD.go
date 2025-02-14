package main

import (
	"encoding/json"
	"fmt"
	"os"

	"gorm.io/driver/sqlite" // Sqlite driver based on CGO
	"gorm.io/gorm/clause"

	"github.com/siddhant-nair/snipbin/internal/models"
	// "github.com/glebarez/sqlite" // Pure go SQLite driver, checkout https://github.com/glebarez/sqlite for details
	"gorm.io/gorm"
)

func createSnippetList(db *gorm.DB, language string) {

	jsonData, err := os.ReadFile("data_files/" + language + ".json")

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

	res := db.Clauses(clause.Insert{Modifier: "or IGNORE"}).Create(snippetList)
	fmt.Println(res.RowsAffected, "Rows affected in snippets for", language)
}

func createLanguageList(db *gorm.DB, languageList map[string]*models.Language) {
	languageArray := []*models.Language{}

	for _, v := range languageList {
		languageArray = append(languageArray, v)
	}

	// fmt.Println(languageArray)

	res := db.Clauses(clause.Insert{Modifier: "or IGNORE"}).Create(languageArray)
	fmt.Println(res.RowsAffected, "Rows affected in Language")
}

func QueryTrials(db *gorm.DB, languageList map[string]*models.Language) {

	lang := languageList["javascript"]

	var snipList []*models.Snippet

	db.Where(&models.Snippet{LanguageID: lang.LanguageID}).Find(&snipList)

	// fmt.Println(len(snipList))
}

func main() {
	db, err := gorm.Open(sqlite.Open("../snippetsDB-dev.db"), &gorm.Config{
		// Logger: logger.Default.LogMode(logger.Silent),
	})
	if err != nil {
		panic("failed to connect to the database")
	}

	var languageList = models.GetLanguageList()

	// insert := "language"
	// insert := "snippets"
	insert := "all"
	// insert := ""

	if amIQuerying := false; amIQuerying {
		QueryTrials(db, languageList)
		return
	}

	if onlyProcess := false; onlyProcess {
		PreProcessor(db)
		return
	}

	languages := [...]string{
		"javascript",
		"go",
		"python",
		"rust",
		"cpp",
	}

	if insert == "language" {
		db.AutoMigrate(&models.Language{})
		createLanguageList(db, languageList)
	} else if insert == "snippets" {
		db.AutoMigrate(&models.Snippet{})
		createSnippetList(db, languages[1])
		// PreProcessor(db)

	} else if insert == "all" {
		db.AutoMigrate(&models.Language{}, &models.Snippet{})

		createLanguageList(db, languageList)

		for i := range languages {
			createSnippetList(db, languages[i])
		}

		PreProcessor(db)
	}

}
