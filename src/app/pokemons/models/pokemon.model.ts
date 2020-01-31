export interface Pokemon {
    id: number;
    name: string;
    description: string;
    height: number;
    weight: number;
    types: [string];
}

export interface PageData<T>{
    data: T[];
    limit: number;
    offset: number;
}