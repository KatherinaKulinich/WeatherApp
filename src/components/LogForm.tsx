import { AccountCircle } from '@mui/icons-material';
import { Box, TextField } from '@mui/material';
import { IconContext } from 'react-icons';
import { MdSend} from 'react-icons/Md';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import LockIcon from '@mui/icons-material/Lock';
import { useEffect, useState } from 'react';
import { AuthErrorCodes } from 'firebase/auth';

interface LogFormProps {
    formTitle: string;
    onSendData:  (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, email: string, password: string) => void;
    error?: Error;
}





export const LogForm: React.FC<LogFormProps> = ({ formTitle, onSendData, error}) => {

    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);


    const { email, password, onSaveEmail, onSavePassword, setError} = useFirebaseAuth()

    
    const onValidateEmail = () => {

        if (error) {
            console.log(error.message);
            if (error.message.includes('auth/invalid-email')) {
                
                setIsEmailInvalid(true)
                return
            }
            setIsEmailInvalid(false)
        }
    }

    const onHandleChangeEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
        onSaveEmail(e)
        setError(null)
        setIsEmailInvalid(false)
    }



    const onValidatePassword = () => {

        if (error) {
            console.log(error.message);
            if (error.message.includes('auth/weak-password') || error.message.includes('auth/wrong-password')) {
                
                setIsPasswordInvalid(true)
                return
            }
            setIsPasswordInvalid(false)
        }
    }

    const onHandleChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        onSavePassword(e)
        setError(null)
        setIsPasswordInvalid(false)
    }




    useEffect(() => {
        onValidateEmail()
        onValidatePassword()
    }, [error])
    
    


    return (
        <form 
            action="" 
            method="post" 
            id="userLogForm"
            className='flex flex-col items-center gap-10 w-full'
        >
            <h1 className='text-sky-50 uppercase'>
                {formTitle}
            </h1>
            <div className='flex flex-col items-center gap-6'>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                        id="userEmail" 
                        label="Email" 
                        variant="standard" 
                        type="email"
                        value={email}
                        onChange={onHandleChangeEmail}
                        autoComplete='off'
                        error={isEmailInvalid}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                        id="userPassword" 
                        label="Password" 
                        variant="standard" 
                        type="password"
                        value={password}
                        onChange={onHandleChangePassword}
                        autoComplete='off'
                        error={isPasswordInvalid}
                    />
                </Box>
            </div>
            <button 
                type='submit'
                className='border rounded-md px-4 py-2 bg-sky-200/25 p-2 hover:bg-sky-500/25 active:bg-sky-500/50 flex items-center gap-4  text-sky-50 uppercase text-xs md:text-base'
                onClick={(event) => onSendData(event, email, password)}
            >
                Send
                <IconContext.Provider value={{ color: "#e0f2fe", size: "24px" }}>
                    <MdSend/>
                </IconContext.Provider>
            </button>
        </form>
    )
}