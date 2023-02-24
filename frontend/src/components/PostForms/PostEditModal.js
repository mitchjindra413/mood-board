import { useDispatch, useSelector } from "react-redux"
import { Modal } from "../../context/Modal"
import { hideModal } from "../../store/ui"
import { PostEdit } from './PostEdit'

export const PostEditModal = () => {
    const dispatch = useDispatch()
    const post = useSelector(state => state.ui.editPost)

    return (
        <Modal onClose={() => dispatch(hideModal())}>
            <PostEdit id={post}/>
        </Modal>
    )
}