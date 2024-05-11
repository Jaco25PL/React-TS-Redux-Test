import type { Users } from "../types"

interface Props {
    paint: boolean
    mock: Users[]
}

export function Table ({ paint, mock }: Props) {


    return (

        <table className='w-full'>
            <thead>
                <tr className='[&>th]:py-5'>
                    <th>IMAGE</th>
                    <th>NAME</th>
                    <th>LAST NAME</th>
                    <th>COUNTRY</th>
                    <th>ACTION</th>
                </tr>
            </thead>

            <tbody className={`${ paint ? '[&_tr:nth-child(even)]:bg-gray-700' : ''}`} >
                {
                        mock?.map((user, index) => (
                        <tr key={index} >

                            <th>
                                <img className='mx-auto'  src={user.thumbnail} alt={`${user.firstName} ${user.lastName}`} />
                            </th>

                            <th ><span>{user.firstName}</span></th>
                            <th ><span>{user.lastName}</span></th>
                            <th ><span>{user.country}</span></th>
                            <th ><button type='button'>Delete</button></th>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
    
}