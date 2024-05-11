export interface Users {
    thumbnail: string 
    firstName:string
    lastName: string
    country: string
}

export interface User {
    picture: { thumbnail: string }
    location: { country: string }
    name: {
        first: string
        last: string
    }
}