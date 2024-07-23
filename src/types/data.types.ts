export interface RouteType {
    path: string;
    element: JSX.Element;
    children?: RouteType[];
}

export interface Resources {
    title: string;
    description: string;
    icon: string;
    date: string;
    link: string
}