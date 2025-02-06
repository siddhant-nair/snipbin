package main

import (
	// "fmt"
	"log"
	"net/http"

	"github.com/siddhant-nair/snipbin/api/handlers"
	"github.com/siddhant-nair/snipbin/internal/database"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	// "github.com/siddhant-nair/snipbin/internal/models"
	// "github.com/gin-gonic/gin"
)

func main() {
	db, err := gorm.Open(sqlite.Open("snippetsDB.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect to the database")
	}

	mux := http.NewServeMux()
	userRepo := database.NewUserRepo(db)
	server := handlers.NewHandler(userRepo)

	server.SetLanguage()
	mux.HandleFunc("GET /", server.GetAllSnippets)

	log.Fatal(http.ListenAndServe("localhost:8080", mux))
	// listen and serve on 0.0.0.0:8080
}
