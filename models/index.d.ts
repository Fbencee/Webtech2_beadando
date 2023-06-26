export interface FoodDTO {
    id: number;
    name: string;
    desc: string;
    preptime: number;
    price: number;
}

export interface UserDTO{
    id: number;
    email: string;
    password: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface AccessTokenDTO {
    accessToken: string;
}