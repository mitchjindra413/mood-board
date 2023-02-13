import moment from "moment"
import { useState, useEffect } from "react"

export const CalendarComponent = () => {
    const [calendar, setCalendar] = useState([])
    const [value, setValue] = useState(moment())

    const startMonth = value.clone().startOf("month").startOf("week")
    const endMonth = value.clone().endOf("month").endOf('week')
    
    useEffect(() => {
        const day = startMonth.clone().subtract(1, 'day')
        const temp = []
        while (day.isBefore(endMonth, 'day')) {
            temp.push(Array(7).fill(0).map(() => day.add(1, 'day').clone()))
        }
        setCalendar(temp)
    }, [value])
    


    return (
        <div>
            {calendar.map(week => (
                <div> 
                    {week.map(day => (
                        <div onClick={() => setValue(day)}>
                            {day.format('D')}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}