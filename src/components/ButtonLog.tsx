interface ButtonLogProps {
    isAuth: boolean;
    onUserAuth: any;
}



export const ButtonLog:React.FC<ButtonLogProps> = ({isAuth, onUserAuth}) => {
    
    return (
        <button 
            type="button"
            className="border uppercase rounded-full px-4 py-2 md:px-6 md:py-3 text-white text-xs md:text-sm hover:bg-slate-50/10 active:text-amber-200"
            onClick={onUserAuth}
        >
            {isAuth ? 'Log out' : 'Log in'}
        </button>
    )
}