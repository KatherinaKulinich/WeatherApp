import { AccountCircle } from '@mui/icons-material';
import { Box, TextField } from '@mui/material';
import { IconContext } from 'react-icons';
import { MdSend} from 'react-icons/Md';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import LockIcon from '@mui/icons-material/Lock';
import { useCallback, useEffect, useState } from 'react';



interface LogFormProps {
    formTitle: string;
    onSendData:  (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, email: string, password: string) => void;
    error: ErrorType
}





export const LogForm: React.FC<LogFormProps> = ({ formTitle, onSendData, error}) => {

    const { email, password, onSaveEmail, onSavePassword, setError} = useFirebaseAuth()
    const [isEmailError, setIsEmailError] = useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false)


    const onHandleChangeEmail = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        onSaveEmail(e)
        setIsEmailError(false)
        setError(null)
    },[])

    const onHandleChangePassword = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        onSavePassword(e)
        setIsPasswordError(false)
        setError(null)
    },[])


    const onFilterError = useCallback((err:ErrorType) => {;  
        if (err) {
            if (err.message.includes('auth/invalid-email')) {   
                setIsEmailError(true)
            }

            if (err.message.includes('auth/weak-password') || err.message.includes('auth/wrong-password')) {    
                setIsPasswordError(true)  
            }
        }
    }, [isEmailError, isPasswordError])
    
    
    const onSendUserData = useCallback((event:any, email:string, password:string) => {
        onFilterError(error)
        onSendData(event, email, password)
    },[error, isEmailError, isPasswordError])
    
    
    
    useEffect(() => {
        onFilterError(error)
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
                        error={isEmailError}
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
                        error={isPasswordError}
                    />
                </Box>
            </div>
            <button 
                type='submit'
                className='border rounded-md px-4 py-2 bg-sky-200/25 p-2 hover:bg-sky-500/25 active:bg-sky-500/50 flex items-center gap-4  text-sky-50 uppercase text-xs md:text-base'
                onClick={(event) => onSendUserData(event, email, password)}
            >
                Send
                <IconContext.Provider value={{ color: "#e0f2fe", size: "24px" }}>
                    <MdSend/>
                </IconContext.Provider>
            </button>
        </form>
    )
}