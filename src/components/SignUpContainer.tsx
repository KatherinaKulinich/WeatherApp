import { AccountCircle } from "@mui/icons-material"
import { Box, TextField } from "@mui/material"
import { LogForm } from "./LogForm"
import LockIcon from '@mui/icons-material/Lock';




export const SignUpContainer:React.FC = () => {
    
    return (
        <div className="border rounded-md  p-8 md:p-16 w-full max-w-[600px] mr-auto ml-auto bg-sky-200/10 flex flex-col items-center gap-6">
            <LogForm formTitle="Sign Up form">
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                        id="userEmail" 
                        label="Email" 
                        variant="standard" 
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                        id="userPassword" 
                        label="Password" 
                        variant="standard" 
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                        id="userPasswordCheck" 
                        label="Repeat password" 
                        variant="standard" 
                    />
                </Box>
            </LogForm>
        </div>
    )
}