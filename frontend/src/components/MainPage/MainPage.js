import { Calendar } from "../Calendar/CalendarComponent"
import { Dock } from "../Dock/Dock"
import './MainPage.css'

export const MainPage = () => {

    return (
        <div className="mainpage-container">
            <Calendar/>
            <Dock/>
        </div>
    )
}