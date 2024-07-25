export interface RouteType {
    path: string;
    element: JSX.Element;
    children?: RouteType[];
}

export type ResourceValues = {
    icon: string;
    title: string;
    description: string;
    date: string;
    link: string;
    createdAt: string;
    updatedAt: string;
};