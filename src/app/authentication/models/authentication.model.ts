export interface Token {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

export interface Error {
    statusCode: number
    error: string
    message: string
}