import { BiError } from 'react-icons/Bi'
import { IconContext } from "react-icons";


export const ErrorMessage: React.FC = () => {
    return (
        <div className="flex flex-col items-center gap-8 w-full h-full">
            <IconContext.Provider value={{ color: "#e0f2fe", size: "160px"}}>
                <BiError/>
            </IconContext.Provider>
            <div className='flex flex-col gap-3'>
                <p className="text-center uppercase text-xl sm:text-4xl text-sky-200 font-extralight ">
                    Error: No data
                </p>
                <p className="text-center uppercase text-md sm:text-xl text-sky-200 font-extralight ">
                    Try later
                </p>
            </div>
        </div>
    )
}