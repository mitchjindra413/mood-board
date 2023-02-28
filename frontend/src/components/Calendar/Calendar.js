import moment from "moment"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts } from "../../store/posts"
import { showCreatePost, showPostModal } from "../../store/ui"
import './Calendar.css'

export const Calendar = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.entities.posts)
    const loading = useSelector(state => state.ui.loading)

    const [calendar, setCalendar] = useState([])
    const [value, setValue] = useState(moment())
    const today = moment()

    const startMonth = value.clone().startOf("month").startOf("week")
    const endMonth = value.clone().endOf("month").endOf('week')

    useEffect(() => {
        dispatch(fetchPosts( user._id ))
    }, [value])
    
    useEffect(() => {
        const day = startMonth.clone().subtract(1, 'day')
        const temp = []
        while (day.isBefore(endMonth, 'day')) {
            temp.push(Array(7).fill(0).map(() => day.add(1, 'day').clone()))
        }
        setCalendar(temp)
    }, [value])

    const monthSwitch = (oper) => {
        switch(oper){
            case '+':
                return value.clone().add(1, "month")
            case '-':
                return value.clone().subtract(1, "month")
        }
    }

    const switchDisable = () => {
        return value.month() === today.month() && value.year() === today.year()
    }

    const buttonDisable = (day) => {
        return day.isAfter(today, 'day') || day.month() !== value.month()
    }

    const styling = (day) => {
        const s = ['day']
        if(day.clone().format('l') == today.clone().format('l')) {
            s.push('today')
        } 
        return s.join(' ')
    }

    const sColor = (day) => {
        const date = day.format('l')
    
        if(posts[date]){
            switch(posts[date].rating){
                case 1:
                    return {color: 'white', backgroundColor: '#FFC906'}
                case 2:
                    return { color: 'white', backgroundColor: '#F99E4C'}
                case 3:
                    return { color: 'white', backgroundColor: '#F05F24'}
                case 4:
                    return { color: 'white', backgroundColor: '#40BCC9'}
                case 5:
                    return { color: 'white', backgroundColor: '#0A6E8F'}
            }
        }

        return {}
    }

    const handleClick = (day) => {
        if(posts[day]){
            dispatch(showPostModal(day))
        } else if (day === today.format('l')) {
            dispatch(showCreatePost())
        }
        else {}
    }

    const buildBody = () => {
        if(loading){
            return (
                <div>
                </div>
            )
        } else {
            return (
                <>
                {calendar.map(week => (
                    <div className="week" key={week}>
                        {week.map(day => (
                            <button key={day} 
                                className={styling(day)} 
                                disabled={buttonDisable(day)}
                                style={sColor(day)}
                                onClick={() => handleClick(day.format('l'))}>
                                {day.format('D')}
                            </button>
                        ))}
                    </div>
                ))}
                </>
            )
        }   
    }

    return (
        <div className="calendar">
            <div className="calendar-heading">
                <button className="calendar-selector"
                    onClick={() => setValue(monthSwitch('-'))}>
                    <i className="fa-solid fa-chevron-left left-right"></i>
                </button>
                <div className="month-year">
                    {value.format('MMMM')} {value.format('YYYY')}
                </div>
                <button className="calendar-selector" 
                    disabled={switchDisable()}
                    onClick={() => setValue(monthSwitch('+'))}>
                    <i className="fa-solid fa-chevron-right left-right"></i>
                </button>
            </div>
            <div className="calendar-body">
                {buildBody()}
            </div>
        </div>
    
    )
}