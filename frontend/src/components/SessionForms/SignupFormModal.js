import { Modal } from "../../context/Modal/Modal"
import SignupForm from "./SignupForm"
import { useDispatch } from "react-redux"
import { hideModal } from "../../store/ui"

export const SignupFormModal = () => {
    const dispatch = useDispatch()

    return (
        <Modal>
            <SignupForm onClick={() => dispatch(hideModal())}/>
        </Modal>
    )
}