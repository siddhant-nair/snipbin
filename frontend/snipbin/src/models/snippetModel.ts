import { fetchAllApi, fetchSearchResultApi } from "../util/apiHandler"

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

    fetchSnippets(language: string): Promise<SnippetModel[]> {
        const fetchSnippetUrl = `${this.url}/${language}`
        return fetchAllApi<SnippetModel[]>(fetchSnippetUrl)
    }

    fetchSearchResult(language: string, searchString: string): Promise<SnippetModel[]> {
        const bodyJson: {searchString : string} = {"searchString" : searchString}
        const SearchUrl = `${this.url}/${language}/search`
        return fetchSearchResultApi<SnippetModel[]>(SearchUrl, bodyJson)
    }

    fetchLanguages(): Promise<LanguageModel[]> {
        const fetchLanguageUrl = `${this.url}/languagelist`
        return fetchAllApi<LanguageModel[]>(fetchLanguageUrl)
    }

}