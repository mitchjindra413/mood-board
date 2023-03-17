import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import './Post.css'
import { hideModal, showEditPost } from "../../store/ui"

export const Post = ({postId}) => {
    const post = useSelector(state => state.entities.posts[postId])
    const [month, year] = moment(post.createdAt).format('ll').split(',')
    const dispatch = useDispatch()

    const key = {
        1: '#FFC906',
        2: '#F99E4C',
        3: '#F05F24',
        4: '#40BCC9',
        5: '#0A6E8F' 
    }


    return (
        <div className="post-container">
            <div>
            <div className="post-header">
                <img src={post.moodPic}></img>
                <div className="date-container">
                    <h1>{month}</h1>
                    <h1>{year}</h1>
                </div>
            </div>
            <div className="rating-container">
                {[1,2,3,4,5].map(val => 
                    <div key={val} 
                        className="rating"
                        style={val === post.rating ? { backgroundColor: key[val], scale: '1.2', border: '2px solid #222222'} : { backgroundColor: key[val], scale: '.9' }}
                        >
                        {val}
                    </div>
                )}
            </div>
            </div>
            
            <div>

            <div className="post-body">
                <h2>Highlight</h2>
                <div className="post-text-area">
                    <p>{post.high}</p>
                </div>
                <h2>Notes</h2>
                <div className="post-text-area note">
                    <p>{post.note}</p>
                </div>
            </div>
            </div>
            {moment(post.createdAt).format('l') === moment().format('l') && (
                <div className="center">
                    <button className="button-post" onClick={() => { dispatch(hideModal()); dispatch(showEditPost(moment(post.createdAt).format('l')))}}>
                        Edit Post
                    </button>
                </div>
            )}
        </div>
    )
}