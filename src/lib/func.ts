import { Resources } from "@/types/forms.types";
import _ from "lodash";
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

export function hasDuplicates(arr: Record<string, any>[], key: string): boolean {
    const grouped = _.groupBy(arr, key);
    const duplicateKeys = _.filter(grouped, (group) => group.length > 1);
    return duplicateKeys.length > 0;
}

export const filterResourcesBySelectedTypes = (resources: any[], selectedTypes: string | any[]) => {
    return resources.filter(resource => selectedTypes.includes(resource.type));
};

const refetchData = () => {  
    const data = JSON.parse(localStorage.getItem('resources') || '[]');
    return data;
}

export const saveToLocalStorage = (resources: Resources[]) => {
    
    const data = refetchData();
    const update = [...data, ...resources];

    let uniqueUpdate: any[] = [];

    const containsDuplicates = hasDuplicates(update, "id");
    if (containsDuplicates) {
        uniqueUpdate = data.map((obj: any) => {
            const matchingData = resources.filter((newObj) => newObj.id === obj.id);
            return matchingData.length > 0 ? matchingData[0] : obj;
        });
        uniqueUpdate.sort((a: Resources, b: Resources) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        localStorage.setItem('resources', JSON.stringify(uniqueUpdate));
        return uniqueUpdate;
    } else {
        uniqueUpdate = _.uniqBy(update, 'id');
        localStorage.setItem('resources', JSON.stringify(uniqueUpdate));
        return uniqueUpdate;
    }
   
}
