export interface SigninFormData {
    username: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    secret: string;
}

export interface Resources {
    _id: string;
    icon: string;
    type: string;
    title: string;
    description: string;
    tags: string[];
    topic: string;
    link: string;
    secret: string;
    createdAt: string;
    updatedAt: string;
}