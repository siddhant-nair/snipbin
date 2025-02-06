package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/siddhant-nair/snipbin/internal/database"
	"github.com/siddhant-nair/snipbin/internal/models"
)

type Handler struct {
	userRepo      *database.UserRepo
	languageArray []*models.Snippet
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
	return &Handler{
		userRepo: userRepo,
	}
}

func (h *Handler) SetLanguage() {
	language := "javascript"

	langArray, _ := h.userRepo.GetLanguageArray(language)

	h.languageArray = langArray
}

func (h *Handler) GetAllSnippets(w http.ResponseWriter, r *http.Request) {
	// language := "javascript"

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(map[string]string{"lmao": "lmao"})
}
