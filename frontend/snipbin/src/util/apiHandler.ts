export async function fetchApi<T>(url: string): Promise<T> {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (err: any) {
        throw (new Error(err))
    }
    // console.log(data)
}

export async function fetchFromPostApi<T>(url: string, body: any): Promise<T> {
    // console.log(JSON.stringify(body))
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json"
            }
        })

        const data = response.json()
        return data
    } catch (error: any) {
        throw (new Error(error))
    }
}