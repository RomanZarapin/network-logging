export interface userData{
    name: string,
    login: string,
    password: string,
    role: number | null | undefined 
}

export interface userForm{
    name: string,
    login: string,
    password: string,
    password_confirm: string,
    role: number | null | undefined 
}