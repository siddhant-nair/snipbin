package handlers

import (
	"encoding/json"
	"fmt"
	"math"
	"net/http"
	"sort"
	"strings"

	"github.com/siddhant-nair/snipbin/internal/database"
	"github.com/siddhant-nair/snipbin/internal/models"
)

type Tuple[T1 any, T2 any] struct {
	First  T1 `json:"snippet"`
	Second T2 `json:"score"`
}

type Handler struct {
	userRepo     *database.UserRepo
	languageName string
	// languageArray     []*models.Snippet
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

func tokenisationCondition(r rune) bool {
	return r == '.' || r == ' ' || r == ',' || r == '`' || r == '\n' || r == '(' || r == ')' || r == ':'
}

func NewHandler(userRepo *database.UserRepo) *Handler {
	return &Handler{userRepo: userRepo}
}

func (h *Handler) SetLanguage(chosenLanguage string) {
	language := chosenLanguage
	langProcessed, err := h.userRepo.GetProcessedArrays(language)

	if err != nil {
		fmt.Println("Something went wrong while setting the database:", err)
	}

	h.languageName = language
	h.languageProcessed = langProcessed
}

func (h *Handler) FetchAllSnippets(w http.ResponseWriter, r *http.Request) {
	h.SetLanguage(r.PathValue("language"))

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	snippetLen := len(h.languageProcessed)

	// json.NewEncoder(w).Encode(h.languageArray)
	json.NewEncoder(w).Encode(h.languageProcessed[:int(math.Min(20.00, float64(snippetLen)))])
}

func (h *Handler) rankResults(searchString string) []models.Snippet {
	scoreCard := []Tuple[models.Snippet, int]{}

	for _, v := range h.languageProcessed {
		scoreCard = append(scoreCard, Tuple[models.Snippet, int]{v.Snippet, 0})
	}

	searchStrTokens := strings.FieldsFunc(searchString, tokenisationCondition)

	for _, token := range searchStrTokens {
		for i, snippet := range h.languageProcessed {
			// fmt.Println(indexMap)
			scoreCard[i].Second += snippet.IndexedScores[token]
		}
	}

	sort.Slice(scoreCard, func(i, j int) bool {
		return scoreCard[i].Second > scoreCard[j].Second
	})

	rankedList := []models.Snippet{}

	for _, v := range scoreCard {
		if v.Second > 0 {
			rankedList = append(rankedList, v.First)
		}
	}

	return rankedList

}

func (h *Handler) SendSearchResult(w http.ResponseWriter, r *http.Request) {
	h.SetLanguage(r.PathValue("language"))

	var bodyJson map[string]string

	json.NewDecoder(r.Body).Decode(&bodyJson)

	rankedList := h.rankResults(bodyJson["searchString"])

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(rankedList[:int(math.Min(float64(len(rankedList)), 5.00))])
	// json.NewEncoder(w).Encode(rankedList)
}

func (h *Handler) FetchLanguages(w http.ResponseWriter, _ *http.Request) {

	langList := h.userRepo.GetLanguages()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(langList)
}

func (h *Handler) FetchSnippet(w http.ResponseWriter, r *http.Request) {
	getTitle := r.PathValue("snippetTitle")
	languageFromUrl := r.PathValue("language")

	langID := models.GetLanguageList()[languageFromUrl].LanguageID

	title := strings.ToUpper(strings.ReplaceAll(getTitle, "-", " "))

	// fmt.Println(title)

	snippet, err := h.userRepo.GetSnippetFromTitle(title, langID)

	if err != nil {
		// errorHandler(w, r, http.StatusNotFound)
		// w.Write([]byte("404 not found"))
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(models.Snippet{})
		return
	}

	json.NewEncoder(w).Encode(snippet)
}

// func errorHandler(w http.ResponseWriter, r *http.Request, status int) {
// 	w.WriteHeader(status)
// 	if status == http.StatusNotFound {
// 		fmt.Fprint(w, "custom 404")
// 	}
// }
