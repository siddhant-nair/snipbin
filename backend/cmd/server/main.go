package main

import (
	// "fmt"
	"fmt"
	"log"
	"net/http"

	"github.com/siddhant-nair/snipbin/api/handlers"
	"github.com/siddhant-nair/snipbin/internal/database"
	"github.com/siddhant-nair/snipbin/internal/models"
	servestatic "github.com/siddhant-nair/snipbin/internal/serve_static"
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
		w.Header().Set("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
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
	serveStatic := servestatic.SecureFileServer("public/language_logos")
	userRepo := database.NewUserRepo(db, models.GetLanguageList())

	server := handlers.NewHandler(userRepo)

	mux.Handle("GET /api/v1/media/assets/", http.StripPrefix("/api/v1/media/assets/", serveStatic))

	mux.HandleFunc("GET /api/v1/languagelist", chainMiddleWare(server.FetchLanguages, middleware...))
	mux.HandleFunc("/api/v1/{language}/search", chainMiddleWare(server.SendSearchResult, middleware...))
	mux.HandleFunc("GET /api/v1/{language}", chainMiddleWare(server.GetAllSnippets, middleware...))

	fmt.Println("Server running on localhost:8080")

	log.Fatal(http.ListenAndServe("localhost:8080", mux))
	// listen and serve on 0.0.0.0:8080
}
