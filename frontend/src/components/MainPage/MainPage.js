import { useDispatch, useSelector } from "react-redux"
import { Calendar } from "../Calendar/Calendar"
import { PostCreateModal } from "../PostForms/PostCreateModal"
import { SplashPage } from "../SplashPage/SplashPage"
import './MainPage.css'
import { logout } from "../../store/session"
import { PostView } from "../PostView/PostView"
import { useHistory, useParams } from "react-router-dom"
import { PostModal } from "../Post/PostModal"
import { PostEditModal } from "../PostForms/PostEditModal"
import { Chart } from "../Chart/Chart"
import { FadeIn } from "../../context/FadeIn/FadeIn"

export const MainPage = () => {
    const user = useSelector(state => state.session.user)
    const modal = useSelector(state => state.ui.modal)
    const dispatch = useDispatch()
    const history = useHistory()
    const {view} = useParams()
    const edit = useSelector(state => state.ui.editPost)
    const postModal = useSelector(state => state.ui.postModal)
    
    if(!user){
        <>
            <SplashPage/>
        </>
    }
    return (
        <div className="mainpage-container">
            {postModal && (<PostModal></PostModal>)}
            {edit && (<PostEditModal></PostEditModal>)}
            <div className="main-content">
                {modal === 'createPost' &&(<PostCreateModal/>)}
                {!view && <FadeIn><Calendar /></FadeIn>}
                {view === 'posts' && <PostView/>}
                {view === 'chart' && <Chart/>}
            </div>
            <div style={{height: '65px'}}>
                <div className='dock-container'>
                    <button><i className="fa-solid fa-calendar" onClick={() => history.push('/')}></i></button>
                    <button><i className="fa-solid fa-rectangle-list" onClick={() => history.push('/posts')}></i></button>
                    <button><i className="fa-solid fa-chart-simple" onClick={() => history.push('/chart')}></i></button>
                    <button><i className="fa-solid fa-right-from-bracket" onClick={() => dispatch(logout())}></i></button>
                </div>
            </div>
            
        </div>
    )
}