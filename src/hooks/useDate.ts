import { useEffect, useState } from "react"



export const useDate = (timeValue: number, timeZone: string) => {


    const TEST = new Date()



    const date = new Date(timeValue)

    const dayOptions: OptionsDay = { weekday: "long" }
    const dateOptions: OptionsDate= {month: 'short'}

    const weekday = new Intl.DateTimeFormat("en-US", dayOptions).format(TEST) //!!!
    const month = new Intl.DateTimeFormat("en-US", dateOptions).format(TEST) //!!!
    const formatDate = `${TEST.getDay()} ${month} ${TEST.getFullYear()}` //!!!


    


    const localTime = new Date().toLocaleTimeString("en-GB", {timeZone: timeZone})
    const [time, setTime] = useState(localTime)


    function refreshClock() {
        setTime(new Date().toLocaleTimeString("en-GB", {timeZone: timeZone}));
    }


    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);

        return function cleanup() {
            clearInterval(timerId);
        };
    }, []);





    // const getSimpleTime = (timeValue:number) => {
    //     const date = new Date(timeValue)
    //     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    // }




    return {
        weekday,
        formatDate,
        time
    }
}