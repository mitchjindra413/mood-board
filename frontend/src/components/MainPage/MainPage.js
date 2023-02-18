import { useSelector } from "react-redux"
import { Calendar } from "../Calendar/Calendar"
import { Dock } from "../Dock/Dock"
import { PostCreateModal } from "../PostForms/PostCreateModal"
import { SplashPage } from "../SplashPage/SplashPage"
import './MainPage.css'

export const MainPage = () => {
    const user = useSelector(state => state.session.user)
    const modal = useSelector(state => state.ui.modal)

    if(!user){
        <>
            <SplashPage/>
        </>
    }
    return (
        <div className="mainpage-container">
            {modal === 'createPost' &&(<PostCreateModal/>)}
            <Calendar/>
            <Dock/>
        </div>
    )
}