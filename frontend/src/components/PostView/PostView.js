import { useDispatch, useSelector } from "react-redux"
import { Post } from "../Post/Post"
import { useEffect } from "react"
import { fetchPosts } from "../../store/posts"
import './Postview.css'
import moment from "moment"
import { showCreatePost } from "../../store/ui"
import { FadeIn } from "../../context/FadeIn/FadeIn"

export const PostView = () => {
    const posts = useSelector(state => Object.keys(state.entities.posts).sort((a, b) => { return b - a }))
    const postsObj = useSelector(state => state.entities.posts)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const today = moment().format('l')
    
    useEffect(() => {
        dispatch(fetchPosts(user._id))
    }, [])

    return (
        <div className="posts-container">
            {!postsObj[today] &&(
                <button className="posts-view-create" onClick={() => dispatch(showCreatePost())}>+ Today</button>
            )}
            {posts.map(post =>
                <FadeIn>
                    <div key={post} style={{ paddingBottom: '20px' }}>
                        <Post  postId={post}></Post>
                    </div>
                </FadeIn>
            )}
        </div>
    )
}