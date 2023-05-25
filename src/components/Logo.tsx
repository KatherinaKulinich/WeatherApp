import logoIcon from '../assets/images/logo.svg';



export const Logo: React.FC = () => {

    return (
        <div className='flex gap-3 md:gap-6 align-middle'>
            <img 
                src={logoIcon} 
                alt="logoIcon" 
                className=' w-14 h-14 md:w-20 md:h-20 '
            />
            <p className='font-bold uppercase text-left text-lg md:text-2xl text-slate-50'>
                <span className='block text-2xl md:text-4xl font-extrabold text-amber-300 '>
                    Weather
                </span>
                App
            </p>
        </div>
    )
}