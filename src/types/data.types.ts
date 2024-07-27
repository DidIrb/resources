export interface RouteType {
    path: string;
    element: JSX.Element;
    children?: RouteType[];
}

export type ResourceValues = {
    id: string;
    icon: string;
    title: string;
    description: string;
    date: string;
    link: string;
    createdAt: string;
    updatedAt: string;
};