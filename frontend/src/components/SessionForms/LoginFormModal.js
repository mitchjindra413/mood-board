import { Modal } from "../../context/Modal/Modal"
import LoginForm from "./LoginForm"
import { useDispatch } from "react-redux"
import { hideModal } from "../../store/ui"

export const LoginFormModal = () => {
    const dispatch = useDispatch()

    return (
        <Modal>
            <LoginForm onClick={() => dispatch(hideModal())} />
        </Modal>
    )
}