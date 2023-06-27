import { FiMail } from 'react-icons/Fi';
import { BsGithub } from 'react-icons/Bs';
import { BsLinkedin } from 'react-icons/Bs';
import { IconContext } from "react-icons";






export const Footer: React.FC = () => {
    const date = new Date().getFullYear()

    return (
        <div className="py-4 md:py-6 flex flex-col-reverse md:flex-row gap-4 md:gap-0 items-center justify-between">
            <div className="flex flex-col  items-center md:items-start gap-2">
                <p className="pb-2 border-b border-b-sky-200 text-sky-200 flex gap-2 uppercase text-xs sm:text-sm">
                    Created by 
                    <span className="text-sky-50">
                        Kateryna Kulinich
                    </span>
                </p>
                <p className="text-xs text-sky-200 uppercase">
                    Weather App. {date}
                </p>
            </div>
            <div className='flex gap-8'>
                <a 
                    href="https://github.com/KatherinaKulinich" 
                    target="_blank"
                >
                    <IconContext.Provider value={{ color: "#fde68a", size: "25px" }}>
                        <BsGithub/>
                    </IconContext.Provider>
                </a>
                <a 
                    href="https://www.linkedin.com/in/kateryna-kulinich-31672025a/" 
                    target="_blank"
                >
                    <IconContext.Provider value={{ color: "#fde68a", size: "25px" }}>
                        <BsLinkedin/>
                    </IconContext.Provider>
                </a>
                <a href="mailto:kulinichcatherina@ggmail.com">
                    <IconContext.Provider value={{ color: "#fde68a", size: "25px" }}>
                        <FiMail/>
                    </IconContext.Provider>
                </a>
            </div>
        </div>
    )
}