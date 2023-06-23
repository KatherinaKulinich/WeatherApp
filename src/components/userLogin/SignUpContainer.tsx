import { LogForm } from "./LogForm"



interface SignUpContainerProps {
    onSendData: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, email: string, password: string) => void;
    error: ErrorType
}




export const SignUpContainer:React.FC<SignUpContainerProps> = ({onSendData, error}) => {
    
    return (
        <div className="border rounded-md  p-8 md:p-16 w-full max-w-[600px] mr-auto ml-auto bg-sky-200/10 flex flex-col items-center gap-6">
            <LogForm 
                formTitle="Sign Up form" 
                onSendData={onSendData}
                error={error}
            />
        </div>
    )
}