import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LineGraph } from "./LineGraph"
import { fetchPosts } from "../../store/posts"
import './Chart.css'
import moment from "moment"

export const Chart = () => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const start = moment().startOf('week')
    const end = moment().endOf('week')
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
        <div className="line-graph-container">
            <LineGraph />
        </div>
        
    )
}