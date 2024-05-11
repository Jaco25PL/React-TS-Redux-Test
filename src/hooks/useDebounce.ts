import { useEffect, useState } from "react"
import type { Users } from "../types"

export function useDebounce ( data: Users[], time: number ) {
    const [ debouncedData , setDebouncedData ] = useState<Users[]>( data )

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setDebouncedData(data)
        }, time)

        return () => clearTimeout(debounceTimeout)

    }, [ data , time ])

    return debouncedData
}