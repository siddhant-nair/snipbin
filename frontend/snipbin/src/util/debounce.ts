// https://stackoverflow.com/questions/75988682/debounce-in-javascript

export default function debounce(callback: Function, delay: number): Function {
    let timeoutId: number | undefined = undefined;
    return (...args: any[]) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(()=> {
            callback(...args)
        }, delay)
    }
}