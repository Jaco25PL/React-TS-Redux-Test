import type { Users } from "../types"

interface Props {
    setISorting: (sort: string) => void 
    paint: boolean
    users: Users[]
    handleDeleteUser: (userID: string) => void
}

export function Table ({ setISorting, paint, users, handleDeleteUser }: Props) {

    return (

        <table className='w-full'>
            <thead>
                <tr className='[&>th]:pb-5'>
                    <th>IMAGE</th>
                    <th onClick={() => setISorting('NAME')} className="active:text-blue-500 underline cursor-pointer">NAME</th>
                    <th onClick={() => setISorting('LASTN')} className="active:text-blue-500 underline cursor-pointer">LAST NAME</th>
                    <th onClick={() => setISorting('COUNTRY')} className="active:text-blue-500 underline cursor-pointer">COUNTRY</th>
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