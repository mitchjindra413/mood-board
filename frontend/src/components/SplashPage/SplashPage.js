import LoginForm from "../SessionForms/LoginForm"
import './SplashPage.css'

export const SplashPage = () => {

    return (
        <div className="splash">
            <nav className="splash-nav">
                <h2>mūdo</h2>
                <div className="nav-button-container">
                    <button className="nav-button">
                        Login
                    </button>
                    <button className="nav-button">
                        Signup
                    </button>
                </div>
            </nav>
            <div className="splash-1">
                {/* <h1>Write Track Reflect:</h1>
                <h1>moodBoard</h1> */}
                <div className="login-form-splash">
                    <LoginForm></LoginForm>
                </div>
            </div>
        </div>
    )
}