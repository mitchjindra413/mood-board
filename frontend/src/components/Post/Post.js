import { useSelector } from "react-redux"
import moment from "moment"

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
            <div className="post header">
                <img src={post.moodPic}></img>
                <h1>{moment(post.createdAt).format('LL')}</h1>
            </div>
            <div className="rating-container">
                {[1,2,3,4,5].map(val => {
                    <div key={val} 
                        className="rating"
                        style={ val === post.rating ? {backgroundColor: key[val]} : {backgroundColor: '#ebebeb'}}
                        >
                        {val}
                    </div>
                })
                }
            </div>
            <div className="post-body">
                <div>
                    {post.note}
                </div>
                <div>
                    {post.high}
                </div>
            </div>
        </div>
    )
}