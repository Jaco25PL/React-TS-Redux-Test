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

            <tbody className={`${ paint ? '[&_tr:nth-child(even)]:bg-[#555] [&_tr:nth-child(odd)]:bg-[#333]' : ''}`} >
                {
                        users?.map((user, index) => (
                        <tr key={index} className="border-b-[3px] border-solid border-[#222]">

                            <th>
                                <img className='mx-auto'  src={user.thumbnail} alt={`${user.firstName} ${user.lastName}`} />
                            </th>

                            <td ><span>{user.firstName}</span></td>
                            <td ><span>{user.lastName}</span></td>
                            <td ><span>{user.country}</span></td>
                            <td ><button 
                                    type='button'
                                    onClick={() => handleDeleteUser(user.id)}
                                    >Delete</button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
    
}