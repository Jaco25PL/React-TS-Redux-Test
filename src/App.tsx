import './App.css'
import type { Users } from './types'
import { useEffect, useMemo, useState } from 'react'
import results from './mock/results.json'
import { fetchingData } from './services/users'
import { Table } from './components/Table'

export default function App () {

    const [ users , setUsers ] = useState<Users[]>([])
    const [ mock , setMock ] = useState<Users[]>([])
    const [ paint , setPaint ] = useState<boolean>(false)
    const [ sort , setSort ] = useState<boolean>(false)

    useEffect(() => {
       
        // fetchingData().then(setUsers)

        const mockmapped = results?.results.map(user => ({
            id: user.id.value,
            thumbnail: user.picture.thumbnail,
            firstName: user.name.first,
            lastName: user.name.last,
            country: user.location.country
        })) 

        setMock(mockmapped)
    }, [])

    const handlePaintedRows: React.MouseEventHandler<HTMLButtonElement> = (): void => {
        setPaint(value => !value)
    }

    const sortedUsers = useMemo( () => {
        return (sort && mock)
        ? [...mock].sort((a , b) => a.country.localeCompare(b.country))
        : mock 
    }, [mock, sort]) 

    const handleCountrySort = () => {
        setSort(value => !value)
    }

    return(
        <main className='  w-full'>
            <h1 className='text-4xl'>Users</h1>

            <div className='flex gap-2'>
                <button onClick={handlePaintedRows} type='button'>Paint Rows</button>
                <button onClick={handleCountrySort}  type='button'>Order by Country</button>
                <button type='button'>Reset Filters</button>
                <input type='search' name='search' placeholder='Search by Country' />
            </div>

            <Table paint={paint} mock={sortedUsers} />

        </main>
    )
}