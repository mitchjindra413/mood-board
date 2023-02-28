import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LineGraph } from "./LineGraph"
import { fetchPosts } from "../../store/posts"
import './Chart.css'

export const Chart = () => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPosts(user._id))
    }, [])

    return (
        <div className="line-graph-container">
            <LineGraph />
        </div>
        
    )
}