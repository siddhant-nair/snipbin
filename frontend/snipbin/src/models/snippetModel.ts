import { fetchAllApi } from "../util/apiHandler"

export interface SnippetModel {
    snippet_id: number
    title: string
    summary: string
    description: string
    example: string
    tags: string
    language_id: number
}

export class SnippetApis {
    // snippet!: Array<SnippetModel>;
    url = 'http://localhost:8080/'

    fetchSnippets(language: string): Promise<SnippetModel[]> {
        return fetchAllApi<SnippetModel[]>(this.url+language)
    }

    // async fetchSearchResult(language: string, searchString: string): Promise<SnippetModel[]> {
    //     return 
    // }

}