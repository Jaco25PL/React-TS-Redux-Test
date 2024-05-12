import './App.css'
import type { Users } from './types'
import { useEffect, useMemo, useState } from 'react'
import { fetchingData } from './services/users'
import { Table } from './components/Table'
import { useDebounce } from './hooks/useDebounce'

export default function App () {

    const [ users , setUsers ] = useState<Users[]>([])
    const [ paint , setPaint ] = useState<boolean>(false)
    const [ sort , setSort ] = useState<boolean>(false)
    const [ search , setSearch ] = useState<string>()
    const [ currentUsers, setCurrentUsers ] = useState<Users[]>([])

    useEffect(() => {
        fetchingData().then(setUsers)
    }, [])

    const handlePaintedRows: React.MouseEventHandler<HTMLButtonElement> = (): void => {
        setPaint(value => !value)
    }

    const handleDeleteUser = (userID: string) => {
            // const newUsers = currentUsers.filter(user => user.id !== userID)
            // setCurrentUsers(newUsers)
        console.log(userID)
        
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setSearch(query)
    }

    const memoSearch = useMemo(() => {
        return search && search?.length > 0 ? users.filter(user => user.country?.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : users
    }, [search, users])

    const debouncedSearch = useDebounce(memoSearch, 300)

    const handleCountrySort = () => {
        setSort(value => !value)
    }

    const sortedUsers = useMemo( () => {
        return (sort && users)
        ? [...users].sort((a , b) => a.country.localeCompare(b.country))
        : users 
    }, [users, sort]) 

    const handleReset = () => {
        if(users) setCurrentUsers(users)
    }

    useEffect(() => setCurrentUsers(sortedUsers), [sortedUsers])
    useEffect(() => setCurrentUsers(debouncedSearch), [debouncedSearch])

    return(
        <main className='  w-full'>
            <h1 className='text-4xl'>Users</h1>

            <div className='flex gap-2 justify-center my-5'>
                <button onClick={handlePaintedRows} type='button'>Paint Rows</button>
                <button onClick={handleCountrySort}  type='button'>Order by Country</button>
                <button onClick={handleReset} type='button'>Reset Filters</button>
                <input 
                onChange={handleSearch}
                type='search' 
                name='search' 
                placeholder='Search by Country' />
            </div>

            <Table paint={paint} users={currentUsers} handleDeleteUser={handleDeleteUser} />

        </main>
    )
}