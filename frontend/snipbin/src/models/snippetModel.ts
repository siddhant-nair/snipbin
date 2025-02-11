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

export class SnippetApis {
    // snippet!: Array<SnippetModel>;
    url = 'http://localhost:8080'

    fetchSnippets(language: string): Promise<SnippetModel[]> {
        const fetchUrl = `${this.url}/${language}`
        return fetchAllApi<SnippetModel[]>(fetchUrl)
    }

    fetchSearchResult(language: string, searchString: string): Promise<SnippetModel[]> {
        const bodyJson: {searchString : string} = {"searchString" : searchString}
        const SearchUrl = `${this.url}/${language}/search`
        return fetchSearchResultApi<SnippetModel[]>(SearchUrl, bodyJson)
    }

}