import { fetchApi, fetchFromPostApi } from "../util/apiHandler"

export interface SnippetModel {
    snippet_id: number
    title: string
    summary: string
    description: string
    example: string
    tags: string
    language_fk: number
}

export interface LanguageModel {
    language_id: number
    language_name: string
}

export class SnippetApis {
    // snippet!: Array<SnippetModel>;
    url = 'http://localhost:8080/api/v1'

    fetchAllSnippets(language: string): Promise<SnippetModel[]> {
        const fetchSnippetUrl = `${this.url}/${language}`
        return fetchApi<SnippetModel[]>(fetchSnippetUrl)
    }

    fetchSearchResult(language: string, searchString: string): Promise<SnippetModel[]> {
        const bodyJson: {searchString : string} = {"searchString" : searchString}
        const SearchUrl = `${this.url}/${language}/search`
        return fetchFromPostApi<SnippetModel[]>(SearchUrl, bodyJson)
    }

    fetchLanguages(): Promise<LanguageModel[]> {
        const fetchLanguageUrl = `${this.url}/languagelist`
        return fetchApi<LanguageModel[]>(fetchLanguageUrl)
    }

    fetchSnippet(language: string, snippetTitle: string): Promise<SnippetModel> {
        const fetchSnippetUrl = `${this.url}/${language}/${snippetTitle}`
        return fetchApi<SnippetModel>(fetchSnippetUrl) 
    }
}