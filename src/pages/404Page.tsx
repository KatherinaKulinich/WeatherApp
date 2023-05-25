import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from 'react-icons/Md'
import { GiSherlockHolmes } from 'react-icons/Gi'

export const Page404:React.FC = () => {

    const navigate = useNavigate();
    const onBackToPage = () => {
        navigate('/')
    }
    
    return (
        <div className="w-full h-[100vh] flex items-center justify-center flex-col gap-20 bg-sky-600">
            <h1 className="uppercase text-7xl text-sky-200 font-extralight">
                Page not found
            </h1>
            <IconContext.Provider value={{ color: "#e0f2fe", size: "200px" }}>
                <GiSherlockHolmes/>
            </IconContext.Provider>
            <button 
                type="button"
                className="uppercase text-sky-200 font-extralight flex items-center gap-2 hover:text-sky-100"
                onClick={onBackToPage}
            >
                <IconContext.Provider value={{ color: "#bae6fd", size: "24px" }}>
                    <MdArrowBackIosNew/>
                </IconContext.Provider>
                Back to main page
            </button>
        </div>
    )
}