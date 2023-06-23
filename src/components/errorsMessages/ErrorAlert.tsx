import { Alert, AlertTitle } from "@mui/material"

interface ErrorAlertProps {
    errorText:string;
}

export const ErrorAlert:React.FC<ErrorAlertProps> = ({errorText}) => {
    return (
        <Alert 
            severity="error" 
            sx={{ width: '100%', maxWidth: '300px' }} 
            className="flex justify-center  items-center gap-4 uppercase border-2 border-red-800"
        >
            <AlertTitle className="text-red-600">
                Error
            </AlertTitle>
            {errorText}
        </Alert>
    )
}