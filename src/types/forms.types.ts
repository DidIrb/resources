export interface SigninFormData {
    username: string;
    password: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    secret: string;
}

export interface Resources {
    id: string;
    icon: string;
    type: string;
    title: string;
    description: string;
    tags: string[];
    link: string;
    secret: string;
}