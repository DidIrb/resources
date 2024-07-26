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


export const filterResourcesBySelectedTypes = (resources: any[], selectedTypes: string | any[]) => {
    return resources.filter(resource => selectedTypes.includes(resource.type));
};

export const filterTypes = (resources: any[], selectedTypes: string[]) => {
    return resources.filter(resource => selectedTypes.includes(resource.type));
};

export const filterTags = (resources: any[], selectedTags: string[]) => {
    return resources.filter(resource => selectedTags.includes(resource.tags));
};