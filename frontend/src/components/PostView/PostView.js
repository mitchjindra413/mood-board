import { useDispatch, useSelector } from "react-redux"
import { Post } from "../Post/Post"
import { useEffect } from "react"
import { fetchPosts } from "../../store/posts"
import moment from "moment"

export const PostView = () => {
    const posts = useSelector(state => Object.keys(state.entities.posts))
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchPosts(user._id))
    }, [])

    return (
        <div>
            {posts.map(post => 
                <div key={post} style={{ paddingBottom: '20px' }}>
                    <Post  postId={post}></Post>
                </div>
            )}
            <div style={{ height: '70px' }}>

            </div>
        </div>
    )
}