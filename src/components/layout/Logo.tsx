import logoMain from '../../assets/images/logoPlanet.svg';
import logoSun from '../../assets/images/logoSun.svg';
import logoClouds from '../../assets/images/logoClouds2.svg';
import logoLabel from '../../assets/images/logoLabel.svg';



export const Logo: React.FC = () => {

    return (
        <div className='flex gap-3 md:gap-6 items-center'>
            <div className='relative w-24 h-24 lg:w-32 lg:h-32'>
                <img 
                    src={logoMain} 
                    alt="logoIcon" 
                    className='w-16 h-16 lg:w-24 lg:h-24 absolute z-20 top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4'
                />
                <img 
                    src={logoSun} 
                    alt="logoIcon" 
                    className='w-14 h-14 lg:w-24 lg:h-24 absolute z-10 -top-2 lg:-top-6 lg:-left-5'
                />
                <img 
                    src={logoClouds} 
                    alt="logoIcon" 
                    className='w-11 h-11 lg:w-16 lg:h-16 absolute z-30 -bottom-1 lg:-bottom-3 lg:left-0'
                />
                <img 
                    src={logoLabel} 
                    alt="logoIcon" 
                    className=' w-7 h-7 lg:w-12 lg:h-12 absolute right-3 top-2 lg:-top-0 lg:right-3 z-30'
                />
            </div>
            <p className='font-bold uppercase text-left text-lg lg:text-2xl text-slate-50'>
                <span className='block text-2xl lg:text-4xl font-extrabold text-amber-300 '>
                    Weather
                </span>
                App
            </p>
        </div>
    )
}