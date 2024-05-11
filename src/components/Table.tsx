import type { Users } from "../types"

interface Props {
    paint: boolean
    users: Users[]
    handleDeleteUser: (userID: string) => void
}

export function Table ({ paint, users, handleDeleteUser }: Props) {

    return (

        <table className='w-full'>
            <thead>
                <tr className='[&>th]:pb-5'>
                    <th>IMAGE</th>
                    <th>NAME</th>
                    <th>LAST NAME</th>
                    <th>COUNTRY</th>
                    <th>ACTION</th>
                </tr>
            </thead>

            <tbody className={`${ paint ? '[&_tr:nth-child(even)]:bg-gray-700' : ''}`} >
                {
                        users?.map((user, index) => (
                        <tr key={index} >

                            <th>
                                <img className='mx-auto'  src={user.thumbnail} alt={`${user.firstName} ${user.lastName}`} />
                            </th>

                            <th ><span>{user.firstName}</span></th>
                            <th ><span>{user.lastName}</span></th>
                            <th ><span>{user.country}</span></th>
                            <th ><button 
                                    type='button'
                                    onClick={() => handleDeleteUser(user.id)}
                                    >Delete</button></th>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
    
}