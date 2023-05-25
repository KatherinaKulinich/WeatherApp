import { NavLink } from "react-router-dom";

export const Navigation:React.FC = () => {

    const navClass = 'uppercase text-sm md:text-md'

    const setActive = ({isActive}:any):string => {
        return isActive ? `${navClass} font-extrabold text-amber-200` : `${navClass} text-sky-100`;
    }

    return (
        <nav className="flex items-center gap-14 md:gap-20">
            <NavLink 
                to={"mycity"} 
                className={setActive}
            >
                My location
            </NavLink>
            <NavLink 
                to={"/"} 
                className={setActive}
            >
                Search
            </NavLink>
            <NavLink 
                to={"saved"} 
                className={setActive}
            >
                Saved
            </NavLink>
        </nav>
    )
}