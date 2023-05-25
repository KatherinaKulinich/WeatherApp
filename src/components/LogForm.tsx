import DoneIcon from '@mui/icons-material/Done';
import { Button } from '@mui/material';
import { IconContext } from 'react-icons';
import { MdSend} from 'react-icons/Md';

interface LogFormProps {
    children: React.ReactNode;
    formTitle: string;
}

export const LogForm: React.FC<LogFormProps> = ({children, formTitle}) => {
    return (
        <form 
            action="" 
            method="post" 
            id="userLogForm"
            className='flex flex-col items-center gap-8 w-full'
        >
            <h1 className='text-sky-50 uppercase'>
                {formTitle}
            </h1>
            {children}
            <button 
                type='submit'
                className='border rounded-md px-4 py-2 bg-sky-200/25 p-2 hover:bg-sky-500/25 active:bg-sky-500/50 flex items-center gap-4  text-sky-50 uppercase text-xs md:text-base'
            >
                Send
                <IconContext.Provider value={{ color: "#e0f2fe", size: "24px" }}>
                    <MdSend/>
                </IconContext.Provider>
            </button>
        </form>
    )
}