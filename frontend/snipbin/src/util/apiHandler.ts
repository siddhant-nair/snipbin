export async function fetchAllApi<T>(url: string): Promise<T> {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (err: any) {
        throw (new Error(err))
    }
    // console.log(data)
}

export async function fetchSearchResultApi<T>(url: string, body: JSON): Promise<T> {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })

        const data = response.json()
        return data
    } catch (error: any) {
        throw (new Error(error))
    }
}