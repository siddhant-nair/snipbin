package models

type Snippet struct {
	SnippetID   uint `gorm:"primaryKey;autoincrement"`
	Title       string
	Summary     string
	Description string
	Example     string
	Tags        string
	LanguageID  uint
	Language    Language
}

func CreateSnippet(
	snippetJson map[string]interface{}, language string) *Snippet {

	return &Snippet{
		Title:       snippetJson["title"].(string),
		Summary:     snippetJson["summary"].(string),
		Description: snippetJson["description"].(string),
		Example:     snippetJson["example"].(string),
		Tags:        snippetJson["tags"].(string),
		LanguageID:  (*Languages[language]).LanguageID,
		Language:    *Languages[language],
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
