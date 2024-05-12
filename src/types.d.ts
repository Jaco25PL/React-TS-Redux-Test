export interface Users {
    id: string
    thumbnail: string 
    firstName:string
    lastName: string
    country: string
}

export interface User {
    login: { uuid: string }
    picture: { thumbnail: string }
    location: { country: string }
    name: {
        first: string
        last: string
    }
}