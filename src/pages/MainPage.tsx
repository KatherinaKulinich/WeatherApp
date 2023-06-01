
import { useState } from "react"
import { SearchField } from "../components/SearchField"
import { WeatherDisplay } from "../components/WeatherDisplay"

export const MainPage:React.FC = () => {
    const [textValue, setTextValue] = useState('')
    const [data, setData] = useState(false)

    const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextValue(e.target.value)
    }

    const onGetForecast = (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        console.warn(textValue);
        setData(true)



        setTextValue('')
        
    }
    



    return (
        <div className="flex flex-col items-center gap-20 py-16 w-full">
            <SearchField
                onChangeInput={onChangeInputValue}
                inputValue={textValue}
                onSubmitData={onGetForecast}
            />
            {data && (
                <WeatherDisplay 
                    // cityName={"Kharkiv"}
                    // country={"ua"} 
                    // currentDate={0} 
                    // cityTimeZone={"America/New_York"}                
                />
            )}
        </div>
    )
}