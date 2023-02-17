import { useSelector } from "react-redux"
import moment from "moment"
import './Post.css'

export const Post = ({postId}) => {
    const post = useSelector(state => state.entities.posts[postId])

    const key = {
        1: '#FFC906',
        2: '#F99E4C',
        3: '#F05F24',
        4: '#40BCC9',
        5: '#0A6E8F' 
    }


    return (
        <div className="post-container">
            <div className="post-header">
                <img src={post.moodPic}></img>
                <h1>{moment(post.createdAt).format('LL')}</h1>
            </div>
            <div className="rating-container">
                {[1,2,3,4,5].map(val => 
                    <div key={val} 
                        className="rating"
                        style={val === post.rating ? { backgroundColor: key[val], scale: '1.3', border: '2px solid #222222'} : { backgroundColor: key[val], scale: '.9' }}
                        >
                        {val}
                    </div>
                )}
            </div>
            <div className="post-body">
                <h2>Highlight</h2>
                <div className="post-text-area">
                    <p>{post.high}</p>
                </div>
                <h2>Notes</h2>
                <div className="post-text-area">
                    <p>{post.note}</p>
                </div>
            </div>
        </div>
    )
}