import { useDispatch } from "react-redux"
import { Modal } from "../../context/Modal"
import { hideModal } from "../../store/ui"
import { PostCreate } from "./PostCreate"

export const PostCreateModal = () => {
    const dispatch = useDispatch()

    return (
        <Modal onClose={() => dispatch(hideModal())}>
            <PostCreate/>
        </Modal>
    )
}