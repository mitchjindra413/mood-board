import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LineGraph } from "./LineGraph"
import { fetchPosts } from "../../store/posts"
import './Chart.css'
import moment from "moment"

export const Chart = () => {
    const user = useSelector(state => state.session.user)
    const [baseDay, setBaseDay] = useState(moment())
    const dispatch = useDispatch()
    const start = baseDay.clone().startOf('week')
    const end = baseDay.clone().endOf('week')
    const loading = useSelector(state => state.ui.loading)

    useEffect(() => {
        dispatch(fetchPosts(user._id))
    }, [])

    if (loading) {
        return (
            <div>
                loading
            </div>
        )
    }

    return (
        <div>
            <div className="header-chart">
                <h1>{start.format('l')} - {end.format('l')}</h1>
            </div>
            <div className="line-graph-container">
                <LineGraph baseDay={baseDay}/>
            </div>
            <div className="adjust-dates">
                <button onClick={() => setBaseDay(baseDay.clone().subtract(1, 'week'))}><i className="fa-solid fa-chevron-left"></i></button>
                <button disabled={baseDay.format('l') === moment().format('l') ? true : false} onClick={() => setBaseDay(baseDay.clone().add(1, 'week'))}><i className="fa-solid fa-chevron-right"></i></button>
            </div>
        </div>
        
    )
}