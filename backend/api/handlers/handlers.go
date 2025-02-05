package handlers

import "net/http"

type Handler struct{}

func NewHandler() Handler {
	return Handler{}
}

func (h *Handler) setLanguage() {

}

func (h *Handler) GetAllSnippets(w http.ResponseWriter, r *http.Request) {

}
