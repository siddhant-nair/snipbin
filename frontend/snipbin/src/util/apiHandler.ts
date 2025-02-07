export async function fetchApi<T>(url: string): Promise<T> {
    try{
        const response = await fetch(url)
        const data = await response.json()
        return data
    }catch(err: any){
        throw(new Error(err))
    }
    // console.log(data)
}