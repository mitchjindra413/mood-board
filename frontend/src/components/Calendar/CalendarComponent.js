import moment from "moment"
import { useState, useEffect } from "react"
import './Calendar.css'

export const Calendar = () => {
    const [calendar, setCalendar] = useState([])
    const [value, setValue] = useState(moment())
    const today = moment()

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
    
    const isSelected = (day) => {
        return value.isSame(day, 'day')
    }

    const monthSwitch = (oper) => {
        switch(oper){
            case '+':
                return value.clone().add(1, "month")
            case '-':
                return value.clone().subtract(1, "month")
        }
    }

    const switchDisable = () => {
        return value.month() === today.month()
    }

    const styling = (day) => {
        if (day.isAfter(today, 'day') || day.month() !== value.month()) {
            return 'invalid-day'
        } else if(day == today) {
            console.log(day, today)
            return 'today'
        } else {
            return 'day'
        }
    }

    return (
        <div className="calendar">
            <div className="calendar-heading">
                <button className="calendar-selector"
                    onClick={() => setValue(monthSwitch('-'))}>
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <div>
                    {value.format('MMMM')} {value.format('YYYY')}
                </div>
                <button className="calendar-selector" 
                    disabled={switchDisable()}
                    onClick={() => setValue(monthSwitch('+'))}>
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
            <div className="calendar-body">
                {calendar.map(week => (
                    <div className="week"> 
                        {week.map(day => (
                            <button className={styling(day)} >
                                {day.format('D')}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}