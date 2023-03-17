import { useDispatch, useSelector } from "react-redux"
import { showLoginModal, showSignupModal } from "../../store/ui"
import LoginForm from "../SessionForms/LoginForm"
import { LoginFormModal } from "../SessionForms/LoginFormModal"
import { SignupFormModal } from "../SessionForms/SignupFormModal"
import './SplashPage.css'
import { FadeIn } from "../../context/FadeIn/FadeIn"
import posts from './posts.jpg'
import cal from './cal.png'
import chart from './chart.jpg'
import alarm from './alarm.png'


export const SplashPage = () => {
    const dispatch = useDispatch()
    const modal = useSelector(state => state.ui.modal)

    return (
        <div className="splash">
            {modal === 'login' && <LoginFormModal/>}
            {modal === 'signup' && <SignupFormModal/>}
            <div className="splash-nav-container">
                <nav className="splash-nav">
                    <h2>ups&downs</h2>
                    <div className="nav-button-container">
                        <button className="nav-button" onClick={() => dispatch(showLoginModal())}>
                            Login
                        </button>
                        <button className="nav-button" onClick={() => dispatch(showSignupModal())}>
                            Signup
                        </button>
                    </div>
                </nav>
            </div>
            <div className="splash-1">
                <div className="login-form-splash">
                    <LoginForm></LoginForm>
                </div>
                <div className="bouncy-down-wrapper">
                    <div className="bouncy-down-container">
                        <i className="fa-regular fa-circle-down"></i>
                    </div>
                </div>
            </div>
            <div className="splash-2">
                <div className="splash-2-text">
                    <FadeIn>
                        <h3>Life has its UPS</h3>
                    </FadeIn>
                    <FadeIn>
                        <h3>and</h3>
                    </FadeIn>
                    <FadeIn>
                        <h3>Life has its DOWNS</h3>
                    </FadeIn>
                    <FadeIn>
                        <p>Keep track of them all the way you want</p>
                    </FadeIn>
                </div>
            </div>
            <div className="splash-3">
                <FadeIn>
                    <div className="splash-3-container">
                        <div className="splash-3-grid">
                            <div className="img-div">
                                <img className="splash-3-img" src={cal}>
                                </img>
                                <h3>Calendar</h3>
                            </div>
                            <div className="img-div">
                                <img className="splash-3-img" src={posts}>
                                </img>
                                <h3>Post</h3>
                            </div>
                            <div className="img-div">
                                <img className="splash-3-img" src={chart}>
                                </img>
                                <h3>Chart</h3>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
            <div className="space-div"></div>
            <div className="splash-4">
                <p>To keep feelings fresh, journals can only be created on the day</p>
                <img alt="alarm" src={alarm} className="alarm-img"></img>
            </div>
        </div>
    )
}