import { useCallback } from "react";
import { IconContext } from "react-icons";
import { MdArrowBackIosNew } from 'react-icons/Md'
import { useNavigate } from "react-router-dom";


interface BackButtonProps {
    buttonText: string;
}



export const BackButton:React.FC<BackButtonProps> = ({buttonText}) => {

    const navigate = useNavigate();
    const onBackToPage = useCallback(() => {
        navigate(-1)
    },[])

    
    return (
        <button 
            type="button"
            className="uppercase text-sky-200 font-extralight flex items-center gap-2 hover:text-sky-100"
            onClick={onBackToPage}
        >
            <IconContext.Provider value={{ color: "#bae6fd", size: "24px" }}>
                <MdArrowBackIosNew/>
            </IconContext.Provider>
            {buttonText}
        </button>
    )
}