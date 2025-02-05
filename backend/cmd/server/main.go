package main

import (
	// "fmt"
	"log"
	"net/http"

	"github.com/siddhant-nair/snipbin/api/handlers"
	// "github.com/siddhant-nair/snipbin/internal/models"
	// "github.com/gin-gonic/gin"
)

func main() {
	mux := http.NewServeMux()
	server := handlers.NewHandler()

	mux.HandleFunc("POST /language", server.GetAllSnippets)

	log.Fatal(http.ListenAndServe("localhost:8080", mux))
	// listen and serve on 0.0.0.0:8080
}
