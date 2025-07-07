package models

type Snippet struct {
	SnippetID   uint     `json:"snippet_id" gorm:"primaryKey;autoincrement"`
	Title       string   `json:"title"`
	Summary     string   `json:"summary" gorm:"unique"`
	Description string   `json:"description"`
	Example     string   `json:"example"`
	Tags        string   `json:"tags"`
	LanguageID  uint     `json:"language_fk"`
	Language    Language `json:"-"`
}

func CreateSnippet(
	snippetJson map[string]interface{}, language string) *Snippet {

	languageList := GetLanguageList()

	return &Snippet{
		Title:       snippetJson["title"].(string),
		Summary:     snippetJson["summary"].(string),
		Description: snippetJson["description"].(string),
		Example:     snippetJson["example"].(string),
		Tags:        snippetJson["tags"].(string),
		LanguageID:  languageList[language].LanguageID,
		Language:    *languageList[language],
	}
}

func (s *Snippet) GetList() []string {
	return []string{
		s.Title,
		s.Summary,
		s.Description,
		s.Example,
		s.Tags,
	}
}
