import './CityCard.css';
import { IconContext } from 'react-icons';
import { MdDoubleArrow } from 'react-icons/Md';
import { CityCardWidget } from '../CityCardWidget';
import { FaStar } from 'react-icons/Fa'



interface CityCardProps {
    cityName: string;
    temperatureValue: number;
    descriptionValue: string;
    windValue: number;
    pressureValue: number;
    rainValue: number;
    humidityValue: number;
    onOpenCity: React.MouseEventHandler<HTMLButtonElement> ;
    onUnsaveCity: (city:any) => void;
    cityImgSrc: string;
}






export const CityCard:React.FC<CityCardProps> = ({
    cityName, temperatureValue, descriptionValue, windValue, pressureValue, rainValue, humidityValue, onOpenCity, onUnsaveCity, cityImgSrc}) => {

        
    return (
        <div className="card">
            <img 
                src={cityImgSrc} 
                alt="cityImage"
                className='card__image'
            />
            <div className="card__text-wrapper p-3 flex flex-col gap-5 w-full">
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-3 text-white uppercase'>
                        <div className=''>
                            <h1 className=' text-2xl  font-bold'>
                                {cityName}
                            </h1>
                            <p className='text-xs font-light'>
                                {descriptionValue}
                            </p>
                        </div>
                        <p className='text-2xl font-bold'>
                            {temperatureValue} &#8451;
                        </p>
                    </div>
                    <div className='flex flex-col-reverse items-end'>
                        <div className='card__arrow'>
                            <IconContext.Provider value={{ color: "#fde68a", size: "54px" }}>
                                <MdDoubleArrow/>
                            </IconContext.Provider>
                        </div>
                        <div 
                            className="card__unsave flex items-center gap-1 cursor-pointer active:text-amber-400"
                            onClick={onUnsaveCity}
                        >
                            <IconContext.Provider value={{ color: "#fde68a", size: "18px"}} >
                                <FaStar/>
                            </IconContext.Provider>
                            <p className="uppercase text-sm md:text-md font-extrabold text-amber-200 active:text-amber-400 hover:text-amber-300 ">
                                unsave
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card__details-wrapper flex flex-col items-center gap-5 w-full">
                    <div className='grid grid-cols-2 grid-rows-2 w-full'>
                        <CityCardWidget 
                            itemName={'Wind'} 
                            itemValue={windValue} 
                            itemUnits={'metre/sec'}
                            borderStyles='border-r-[1px] border-r-slate-50/25 border-b-[1px] border-b-slate-50/25'
                        />
                        <CityCardWidget 
                            itemName={'Humidity'} 
                            itemValue={humidityValue} 
                            itemUnits={'%'}
                            borderStyles='border-b-[1px] border-b-slate-50/25'
                        />
                        <CityCardWidget 
                            itemName={'Chance of rain'} 
                            itemValue={rainValue} 
                            itemUnits={'%'}
                            borderStyles='border-r-[1px] border-r-slate-50/25'
                        />
                        <CityCardWidget 
                            itemName={'Pressure'} 
                            itemValue={pressureValue} 
                            itemUnits={'hPa'}
                        />
                    </div>
                    <button 
                        type='button' 
                        className=' text-amber-200 uppercase font-bold text-lg hover:text-amber-300 card__button'
                        onClick={onOpenCity}
                    >
                        More info
                        <IconContext.Provider value={{ color: "#fde68a", size: "24px" }}>
                            <MdDoubleArrow/>
                        </IconContext.Provider>
                    </button>
                </div>
            </div>
        </div>

    )
}