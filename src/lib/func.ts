export function filterByValue(array: any[], value: string) {
    return array.filter((data) => JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);
}

export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
    let timeout: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: Parameters<T>) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    } as T;
}
