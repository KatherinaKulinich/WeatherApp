import logoMain from '../../assets/images/logoPlanet.svg';
import logoSun from '../../assets/images/logoSun.svg';
import logoClouds from '../../assets/images/logoClouds2.svg';
import logoLabel from '../../assets/images/logoLabel.svg';



export const Logo: React.FC = () => {

    return (
        <div className='flex gap-1 items-center'>
            <div className='relative w-12 h-12 lg:w-32 lg:h-32'>
                <img 
                    src={logoMain} 
                    alt="logoIcon" 
                    className='hidden lg:block lg:w-20 lg:h-20 absolute z-20 top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4'
                />
                <img 
                    src={logoSun} 
                    alt="logoIcon" 
                    className='w-12 h-12 lg:w-20 lg:h-20 absolute z-10 top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 lg:translate-x-0 lg:translate-y-0 lg:-top-2 lg:-left-3'
                />
                <img 
                    src={logoClouds} 
                    alt="logoIcon" 
                    className='hidden lg:block lg:w-14 lg:h-14 absolute z-30 -bottom-1 lg:-bottom-0 lg:left-0'
                />
                <img 
                    src={logoLabel} 
                    alt="logoIcon" 
                    className='hidden lg:block lg:w-10 lg:h-10 absolute right-3 top-2 lg:top-2 lg:right-4 z-30'
                />
            </div>
            <p className='font-bold uppercase text-left text-sm lg:text-md text-slate-50 flex items-baseline gap-2 lg:flex-col lg:items-start lg:gap-0 '>
                <span className='text-sm lg:text-2xl font-extrabold text-amber-300 '>
                    Weather
                </span>
                App
            </p>
        </div>
    )
}