import moment from "moment"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPost } from "../../store/posts"
import './PostForm.css'

export const PostCreate = () => {
    const user = useSelector(state => state.session.user._id)
    const [note, setNote] = useState('')
    const [rating, setRating] = useState('')
    const [highlight, setHighlight] = useState('')
    const [pic, setPic] = useState('')

    const dispatch = useDispatch()
    const errors = useSelector(state => state.errors.posts)
    console.log(errors)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createPost({
            note: note,
            rating: rating,
            high: highlight,
            moodPic: pic,
            author: user,
        }))
    }

    const key = {
        1: '#FFC906',
        2: '#F99E4C',
        3: '#F05F24',
        4: '#40BCC9',
        5: '#0A6E8F'
    }

    const urls = [
        'https://mood-seed.s3.us-west-1.amazonaws.com/emojis/path86.png', 
        'https://mood-seed.s3.us-west-1.amazonaws.com/emojis/path62.png', 
        'https://mood-seed.s3.us-west-1.amazonaws.com/emojis/path70.png', 
        'https://mood-seed.s3.us-west-1.amazonaws.com/emojis/path84.png', 
        'https://mood-seed.s3.us-west-1.amazonaws.com/emojis/path78.png', 
        'https://mood-seed.s3.us-west-1.amazonaws.com/emojis/path80.png', 
        'https://mood-seed.s3.us-west-1.amazonaws.com/emojis/path82.png', 
        'https://mood-seed.s3.us-west-1.amazonaws.com/emojis/path96.png',
        'https://mood-seed.s3.us-west-1.amazonaws.com/emojis/path88.png'
    ]

    return (
        <form className="post-form-container" onSubmit={(e) => handleSubmit(e)}>
            <div className="post-form-header">
                <h1>Post for: {moment().format('l')}</h1>
            </div>
            <div className="post-form-body">
                <label>Choose a photo:
                    <figure className="photo-grid">
                        {urls.map(url => 
                            <button type="button" key={url}
                                className="mood-pic-post-form"
                                onClick={() => setPic(url)}>
                                <img alt="mood-pic" src={url}
                                    style={url === pic ? { border: '4px solid #222222'} : { border: '4px solid white'}}
                                ></img>
                            </button>
                        )}
                    </figure>
                </label>
                <div className="post-form-body-right">
                    <label>Rating:
                        <div className="rating-container">
                            {[1, 2, 3, 4, 5].map(val =>
                                <button type="button" key={val}
                                    className="rating"
                                    style={rating === val ? { border: '2px solid #222222', backgroundColor: key[val] } : { backgroundColor: key[val]}}
                                    onClick={() => setRating(val)}
                                >
                                    {val}
                                </button>
                            )}
                        </div>
                    </label>
                    <label>Highlight:
                        <input value={highlight}
                            onChange={e => setHighlight(e.target.value)}
                            type="text">
                        </input>
                    </label>
                    <label>Note:
                        <textarea value={note} 
                            rows="11"
                            placeholder='Write about your day'
                            onChange={(e) => setNote(e.target.value)}>
                        </textarea>
                    </label>
                </div>
            </div>
            <div className="post-form-submit">
                <button disabled={!rating || !pic || !highlight}>Submit</button>
            </div>
            {errors && <div>{errors.values().map( err => <p>{err}</p>)}</div>}
        </form>
    )
}