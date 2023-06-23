import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer";
import { useCallback } from "react";




export const Layout: React.FC = () => {

    const onChangeTheme = useCallback(() => {
        const time = new Date().getHours();

        if (time < 7 || time >= 20) {
            return 'bg-blue-900'
        }
        return 'bg-sky-400'

    },[])
   
    


    return (
        <div className={`min-h-[100vh] flex flex-col justify-between ${onChangeTheme()} `}>
            <header className="bg-slate-50/30">
                <div className="container xl:container mx-auto px-4">
                    <Header/>
                </div>
            </header>
            <main className="container xl:container mx-auto px-4  ">
                <Outlet/>
            </main>
            <footer className="bg-slate-50/30">
                <div className="container xl:container mx-auto px-4">
                    <Footer/>
                </div>
            </footer>
        </div>
    )
}