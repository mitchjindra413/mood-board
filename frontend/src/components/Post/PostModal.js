import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../../context/Modal'
import { hideModal } from '../../store/ui'
import { Post } from './Post'

export const PostModal = () => {
    const post = useSelector(state => state.ui.postModal)
    const dispatch = useDispatch()

    return (
        <Modal onClose={() => dispatch(hideModal())}>
            <Post postId={post}></Post>
        </Modal>
    )
}