interface ButtonLogProps {
    isAuth: boolean;
    onUserAuth: React.MouseEventHandler<HTMLButtonElement>;
}



export const ButtonLog:React.FC<ButtonLogProps> = ({isAuth, onUserAuth}) => {
    
    return (
        <button 
            type="button"
            className="border uppercase rounded-full px-4 py-2 lg:px-6 lg:py-3 text-white text-xs lg:text-sm hover:bg-slate-50/10 active:text-amber-200"
            onClick={onUserAuth}
        >
            {isAuth ? 'Log out' : 'Log in'}
        </button>
    )
}