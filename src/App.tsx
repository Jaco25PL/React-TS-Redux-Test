import './App.css'
import type { Users , User } from './types'
import { useEffect, useState } from 'react'

// import results from './mock/results.json'




export default function App () {

    const [ users , setUsers ] = useState<Users[]>([])

    useEffect(() => {
        const fetchingData = async () => {

            const URL = "https://randomuser.me/api/?results=10"

            const response = await fetch(URL)
            if(!response.ok) throw new Error(`Error fetching data. Status code: ${response.status}`)

            const usersData = await response.json()

            const mappedUsers = usersData.results.map((user: User) => ({
                thumbnail: user.picture.thumbnail,
                firstName: user.name.first,
                lastName: user.name.last,
                country: user.location.country
            }))

            setUsers(mappedUsers)
        }

        fetchingData()
    }, [])


    return(
        <main>
            <h1 className='text-4xl'>Users</h1>

            <table>
                <thead>
                    <tr className='[&>th]:py-5'>
                        <th>IMAGE</th>
                        <th>NAME</th>
                        <th>LAST NAME</th>
                        <th>COUNTRY</th>
                        <th>ACTION</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        users?.map((user, index) => (
                            <tr key={index} className=''>

                                <th className=''>
                                    <img src={user.thumbnail} alt={`${user.firstName} ${user.lastName}`} />
                                </th>

                                <th className=''>
                                    <span>{user.firstName}</span>
                                </th>
                                <th className="">
                                    <span>{user.lastName}</span>
                                </th>
                                <th className="">
                                    <span>{user.country}</span>
                                </th>
                                <th className="">
                                    <button type='button'>delete</button>
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            

        </main>
    )




}