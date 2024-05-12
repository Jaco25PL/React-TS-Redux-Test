import './App.css'
import type { Users } from './types'
import { useEffect, useMemo, useRef, useState } from 'react'
import { fetchingData } from './services/users'
import { Table } from './components/Table'
import { useDebounce } from './hooks/useDebounce'

export default function App () {

    const [ users , setUsers ] = useState<Users[]>([])
    const [ paint , setPaint ] = useState<boolean>(false)
    const [ iSorting , setISorting ] = useState<string>('NONE') // we could use ENUMs here
    const [ search , setSearch ] = useState<string>()
    const originalUsers = useRef<Users[]>([])

    useEffect(() => {
        fetchingData()
            .then(data => {
                setUsers(data)
                originalUsers.current = data
            })
    }, [])

    const handlePaintedRows: React.MouseEventHandler<HTMLButtonElement> = (): void => {
        setPaint(value => !value)
    }

    const handleDeleteUser = (userID: string) => {
        const newUsers = users.filter(user => user.id !== userID)
        setUsers(newUsers)
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setSearch(query)
    }

    const memoSearch = useMemo(() => {
        return search && search?.length > 0 ? users.filter(user => user.country?.toLowerCase().includes(search.toLowerCase())) : users
    }, [search, users])
    
    const debouncedUsers = useDebounce(memoSearch, 300)

    const handleCountrySort = () => {
        const newSortValue = iSorting === 'NONE' ? 'COUNTRY' : 'NONE'
        setISorting(newSortValue)
    }

    const sortedUsers = useMemo( () => {

        if(iSorting === 'NONE') return debouncedUsers

        if(iSorting === 'COUNTRY'){
            return [...debouncedUsers].sort((a , b) => a.country.localeCompare(b.country))
        }

        if(iSorting === 'NAME'){
            return [...debouncedUsers].sort((a , b) => a.firstName.localeCompare(b.firstName)) 
        }

        if(iSorting === 'LASTN'){
            return [...debouncedUsers].sort((a , b) => a.lastName.localeCompare(b.lastName)) 
        }

        return debouncedUsers

    }, [debouncedUsers , iSorting]) 

    const handleReset = () => {
        if(originalUsers.current) setUsers(originalUsers.current)
    }

    return(
        <main className='  w-full'>
            <h1 className='text-4xl'>Users</h1>

            <header className='flex gap-2 justify-center my-5'>
                <button onClick={handlePaintedRows} type='button'>Paint</button>
                <button onClick={handleCountrySort}  type='button'>Order by Country</button>
                <button onClick={handleReset} type='button'>Reset</button>
                <input 
                onChange={handleSearch}
                type='search' 
                name='search' 
                placeholder='Search by Country'
                className='rounded-md pl-3 font-semibold' />
            </header>

            <Table setISorting={setISorting} paint={paint} users={sortedUsers} handleDeleteUser={handleDeleteUser} />

        </main>
    )
}