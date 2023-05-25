interface ItemWidgetProps {
    itemIcon: string;
    itemName: string;
    itemValue: string | number;
    itemUnits?: string;
}


export const ItemWidget:React.FC<ItemWidgetProps> = ({itemIcon, itemName, itemValue, itemUnits}) => {

    return (
        <div className="bg-cyan-50/10 border border-slate-50 p-8 rounded-lg flex flex-col gap-5">
            <div className="flex flex-col justify-center gap-2 items-center">
                <img 
                    src={itemIcon} 
                    alt="icon" 
                    width={50}
                    height={50}
                />
                <p className="text-sm font-light text-sky-100 uppercase">
                    {itemName}
                </p>
            </div>
            <div className="flex gap-2 items-baseline justify-center  ">
                <p className="text-2xl font-bold text-white">
                    {itemValue}
                </p>
                <p className="font-light text-lg text-sky-100">
                    {itemUnits}
                </p>
            </div>
        </div>
    )
}