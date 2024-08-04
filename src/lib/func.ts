import { Resources } from "@/types/forms.types";
import _ from "lodash";

export function filterByValue<T extends { toString(): string }>(
  array: T[],
  value: string
): T[] {
  return array.filter(
    (data) =>
      JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1
  );
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  } as T;
}

export function hasDuplicates(
  arr: Record<string, any>[],
  key: string
): boolean {
  const grouped = _.groupBy(arr, key);
  const duplicateKeys = _.filter(grouped, (group) => group.length > 1);
  return duplicateKeys.length > 0;
}

const refetchData: () => Resources[] = () => {
  const data: Resources[] = JSON.parse(
    localStorage.getItem("resources") || "[]"
  );
  return data;
};


export const saveToLocalStorage = (resources: Resources[]) => {
  const data = refetchData();
  const resourceMap = new Map<string, Resources>(resources.map((res) => [res._id, res]));

  const uniqueUpdate = data.map((obj) => resourceMap.get(obj._id) || obj);
  resources.forEach((res) => {
    if (!data.some((obj) => obj._id === res._id)) {
      uniqueUpdate.push(res);
    }
  });

  uniqueUpdate.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  localStorage.setItem("resources", JSON.stringify(uniqueUpdate));
  return uniqueUpdate;
};


// export const saveToLocalStorage = (resources: Resources[]) => {
//   const data = refetchData();
//   const update = [...data, ...resources];
//   console.log("resources", resources, "and to update", data,"joined array", update)

//   let uniqueUpdate: any[] = [];

//   const containsDuplicates = hasDuplicates(update, "_id");
//   if (containsDuplicates) {

//     uniqueUpdate = data.map((obj: any) => {
//       const matchingData = resources.filter((newObj) => newObj._id === obj._id);
//       return matchingData.length > 0 ? matchingData[0] : obj;
//     });

//     console.log("returned array", uniqueUpdate);
//     uniqueUpdate.sort(
//       (a: Resources, b: Resources) =>
//         new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
//     );
//     localStorage.setItem("resources", JSON.stringify(uniqueUpdate));
//     return uniqueUpdate;
//   } else {
//     uniqueUpdate = _.uniqBy(update, "_id");
//     localStorage.setItem("resources", JSON.stringify(uniqueUpdate));
//     return uniqueUpdate;
//   }
// };

export function filterResources(
  resources: Resources[],
  tags: string[],
  topics: string | string[],
  types: string | string[]
) {
  console.log(resources, "tags", tags, "topics", topics, "types", types)
  return resources.filter((resource) => {
    const hasMatchingTags = tags.length === 0 || tags.some((tag) => resource.tags.includes(tag));
    const hasMatchingTopic = topics.length === 0 || topics.includes(resource.topic);
    const hasMatchingType = types.length === 0 || types.includes(resource.type);

    return hasMatchingTags && hasMatchingTopic && hasMatchingType;
  });
}

