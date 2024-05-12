import type { User, Users } from "../types"

export async function fetchingData (): Promise<Users[]> {
    
    const URL = "https://randomuser.me/api/?results=100"
    
    try {

        const response = await fetch(URL)
        if(!response.ok) throw new Error(`Error fetching data. Status code: ${response.status}`)

        const usersData = await response.json()

        const mappedUsers = usersData.results.map((user: User) => ({
            id: user.login.uuid,
            thumbnail: user.picture.thumbnail,
            firstName: user.name.first,
            lastName: user.name.last,
            country: user.location.country
        }))

        return mappedUsers

    } catch (error) {
        console.error("Erorr fetching data", error )
        throw error
    }
}