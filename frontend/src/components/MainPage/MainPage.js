import { useSelector } from "react-redux"
import { Calendar } from "../Calendar/Calendar"
import { Dock } from "../Dock/Dock"
import { SplashPage } from "../SplashPage/SplashPage"
import './MainPage.css'

export const MainPage = () => {
    const user = useSelector(state => state.session.user)
    const modal = useSelector(state => state.ui.postModal)

    if(!user){
        <>
            <SplashPage/>
        </>
    }
    return (
        <div className="mainpage-container">
            <Calendar/>
            <Dock/>
        </div>
    )
}