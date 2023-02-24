import { useDispatch, useSelector } from "react-redux"
import { Calendar } from "../Calendar/Calendar"
import { PostCreateModal } from "../PostForms/PostCreateModal"
import { SplashPage } from "../SplashPage/SplashPage"
import './MainPage.css'
import { logout } from "../../store/session"
import { PostView } from "../PostView/PostView"
import { useHistory, useParams } from "react-router-dom"

export const MainPage = () => {
    const user = useSelector(state => state.session.user)
    const modal = useSelector(state => state.ui.modal)
    const dispatch = useDispatch()
    const history = useHistory()
    const {view} = useParams()
    
    if(!user){
        <>
            <SplashPage/>
        </>
    }
    return (
        <div className="mainpage-container">
            <div className='dock-container'>
                <i className="fa-solid fa-calendar" onClick={() => history.push('/')}></i>
                <i className="fa-solid fa-bars" onClick={() => history.push('/posts')}></i>
                <i className="fa-solid fa-chart-simple" onClick={() => history.push('/chart')}></i>
                <i className="fa-solid fa-right-from-bracket" onClick={() => dispatch(logout())}></i>
            </div>

            {modal === 'createPost' &&(<PostCreateModal/>)}
            {!view && <Calendar/>}
            {view === 'posts' && <PostView/>}
            {view === 'chart' && <div>Comming soon</div>}
            
        </div>
    )
}