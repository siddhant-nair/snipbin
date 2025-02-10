package main

import (
	// "fmt"
	"fmt"
	"log"
	"net/http"

	"github.com/siddhant-nair/snipbin/api/handlers"
	"github.com/siddhant-nair/snipbin/internal/database"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	// "github.com/siddhant-nair/snipbin/internal/models"
	// "github.com/gin-gonic/gin"
)

type MiddleWare func(http.HandlerFunc) http.HandlerFunc

func chainMiddleWare(f http.HandlerFunc, middleware ...MiddleWare) http.HandlerFunc {
	for _, m := range middleware {
		f = m(f)
	}

	return f
}

func enableCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next(w, r)
	}
}

func main() {
	db, err := gorm.Open(sqlite.Open("snippetsDB.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect to the database")
	}

	middleware := []MiddleWare{enableCORS}

	mux := http.NewServeMux()
	userRepo := database.NewUserRepo(db)
	server := handlers.NewHandler(userRepo)

	// mux.HandleFunc("POST /set-language", chainMiddleWare(server.SetLanguage, middleware...))
	// mux.HandleFunc("GET /", chainMiddleWare(server.GetAllSnippets, middleware...))

	// mux.HandleFunc("PUT /{language}", chainMiddleWare(server.SendSearchResult, middleware...))
	mux.HandleFunc("GET /{language}", chainMiddleWare(server.GetAllSnippets, middleware...))

	fmt.Println("Server running on localhost:8080")

	log.Fatal(http.ListenAndServe("localhost:8080", mux))
	// listen and serve on 0.0.0.0:8080
}
