interface CityCardWidgetProps {
    itemName: string;
    itemValue: number | string;
    itemUnits: string;
    borderStyles?: string;
}


export const CityCardWidget:React.FC<CityCardWidgetProps> = ({itemName, itemValue, itemUnits, borderStyles}) => {
    
    return (
        <div className={`p-2 flex flex-col gap-2 ${borderStyles}`}>
            <p className='uppercase text-slate-50 font-light text-xs'>
                {itemName}
            </p>
            <p className='text-slate-300 text-sm font-extralight'>
                {itemValue} {itemUnits}
            </p>
        </div>
    )
}