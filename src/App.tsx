import './App.css'
import results from './mock/results.json'

export default function App () {

    const users = results.results

    

    return(
        <main>
            <h1 className='text-4xl'>Users</h1>

            <table className="w-full text-sm text-left rtl:text-right ">
                <thead className=" text-xs  uppercase ">
                    <tr className="flex justify-between [&_*]:text-base">
                        <th scope="col" className="w-[100px] px-6 py-3">
                            Profile
                        </th>
                        <th scope="col" className="w-[250px] px-6 py-3">
                            NAME
                        </th>
                        <th scope="col" className="w-[250px] px-3 py-3">
                            LAST NAME
                        </th>
                        <th scope="col" className="flex  px-6 py-3">
                            COUNTRY
                        </th>
                        <th scope="col" className="flex  px-6 py-3">
                            ACTION
                        </th>
                    </tr>
                </thead>
            </table>

            <table>
                <tbody>
                    {
                        users?.map((user, index) => (
                            <tr key={index} className='h-full border-solid border-gray-500 border-b-2 py-4 font-medium whitespace-nowrap flex justify-between items-center'>

                                <th className='w-[100px] px-6 py-4 font-bold  whitespace-nowrap'>
                                    <img src={user.picture.thumbnail} alt={`${user.name.first} ${user.name.last}`} />
                                </th>

                                <th className='w-[250px] px-6 py-4 flex items-center'>
                                    <span>{user.name.first}</span>
                                </th>
                                <th className="w-[250px] pr-6 py-4">
                                    <span>{user.name.last}</span>
                                </th>
                                <th className='px-6 py-4 flex items-center gap-2'>
                                    <span>{user.location.country}</span>
                                </th>
                                <th className='px-6 py-4 flex items-center gap-2'>
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