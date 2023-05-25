interface ButtonLogProps {
    isAuth: boolean;
    onUserAuth: any;
}



export const ButtonLog:React.FC<ButtonLogProps> = ({isAuth, onUserAuth}) => {
    
    return (
        <button 
            type="button"
            className="border uppercase rounded-full px-6 py-3 text-white text-sm hover:bg-slate-50/10 active:text-amber-200"
            onClick={onUserAuth}
        >
            {isAuth ? 'Log out' : 'Log in'}
        </button>
    )
}