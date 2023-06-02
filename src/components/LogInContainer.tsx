import { Box, TextField } from "@mui/material"
import { LogForm } from "./LogForm"
import { AccountCircle } from "@mui/icons-material"
import LockIcon from '@mui/icons-material/Lock';
import { IconContext } from "react-icons";
import { GrGoogle } from 'react-icons/Gr';




interface LogInContainerProps {
    onSendData:  (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, email: string, password: string) => void;
    onHandleClickGoogle:  React.MouseEventHandler<HTMLButtonElement>,
    error?: Error;
    // emailValue: string;
    // passwordValue: string;
    // onChangeEmail: React.ChangeEventHandler<HTMLInputElement>
    // onChangePassword: React.ChangeEventHandler<HTMLInputElement>;
    // onHandleClickGoogle: React.MouseEventHandler<HTMLButtonElement>
}


export const LogInContainer:React.FC<LogInContainerProps> = ({onSendData, onHandleClickGoogle, error}) => {

    return (
        <div className="border rounded-md p-8 md:p-16 w-full max-w-[600px] mr-auto ml-auto bg-sky-200/10 flex flex-col items-center gap-6">
            <LogForm 
                formTitle="Log In form" 
                onSendData={onSendData}
                error={error}
            />
            <p className="uppercase font-extralight text-sky-50">
                or
            </p>
            <button 
                type="button"
                className="border rounded-md px-4 py-2 flex items-center gap-4 text-sky-50 uppercase bg-sky-200/25 hover:bg-sky-500/25 active:bg-sky-500/50 text-xs md:text-base"
                onClick={onHandleClickGoogle}
            >
                Log in with Google
                <IconContext.Provider value={{ color: "#e0f2fe", size: "26px" }}>
                    <GrGoogle/>
                </IconContext.Provider>
            </button>
        </div>
    )
}