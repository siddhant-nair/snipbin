package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/siddhant-nair/snipbin/internal/database"
	"github.com/siddhant-nair/snipbin/internal/models"
)

type SnipperScore struct {
	models.ProcessedSnippet
	models.Snippet
}

type Handler struct {
	userRepo          *database.UserRepo
	languageName      string
	languageArray     []*models.Snippet
	languageProcessed []*models.SnippetxProcessedSnippet

	// languageProcessed []*models.ProcessedSnippet
}

// cookie := http.Cookie{
// 	Name:     "exampleCookie",
// 	Value:    "Hello world!",
// 	Path:     "/",
// 	MaxAge:   3600,
// 	HttpOnly: true,
// 	Secure:   true,
// 	SameSite: http.SameSiteLaxMode,
// }

func NewHandler(userRepo *database.UserRepo) *Handler {
	return &Handler{userRepo: userRepo}
}

func (h *Handler) SetLanguage(chosenLanguage string) {
	language := chosenLanguage /*get language from post body*/
	// langArray, err := h.userRepo.GetLanguageArray(language)
	langProcessed, err := h.userRepo.GetProcessedArrays(language)

	if err != nil {
		fmt.Println("Something went wrong while setting the database:", err)
	}

	h.languageName = language
	// h.languageArray = langArray
	h.languageProcessed = langProcessed
}

func (h *Handler) GetAllSnippets(w http.ResponseWriter, r *http.Request) {
	// language := "javascript"
	// fmt.Println(r.PathValue("language"), "handlers.go line 46")
	if r.PathValue("language") != h.languageName {
		h.SetLanguage(r.PathValue("language"))
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	// json.NewEncoder(w).Encode(h.languageArray)
	json.NewEncoder(w).Encode(h.languageProcessed)
}

func (h *Handler) SendSearchResult(w http.Response, r *http.Request) {
	if r.PathValue("language") != h.languageName {
		h.SetLanguage(r.PathValue("language"))
	}

}
