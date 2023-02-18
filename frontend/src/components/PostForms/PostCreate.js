import moment from "moment"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPost } from "../../store/posts"
import './PostForm.css'

export const PostCreate = () => {
    const [note, setNote] = useState('')
    const [rating, setRating] = useState('')
    const [highlight, setHighlight] = useState('')
    const [pic, setPic] = useState('')

    const dispatch = useDispatch()
    const errors = useSelector(state => state.errors.posts)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createPost({
            note,
            rating,
            highlight,
            pic,
            date: moment().format('l')
        }))
    }

    const key = {
        1: '#FFC906',
        2: '#F99E4C',
        3: '#F05F24',
        4: '#40BCC9',
        5: '#0A6E8F'
    }

    return (
        <form className="post-form-container" onSubmit={(e) => handleSubmit(e)}>
            <div>
                <h1>Post for:</h1>
                <h1>{moment().format('l')}</h1>
            </div>
            <div>
                <label>Choose a photo:

                </label>
                <label>Rating:
                    <div>
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
                        placeholder='Write about your day'
                        onChange={(e) => setNote(e.target.value)}>
                    </textarea>
                </label>
            </div>
            <div>
                <button disabled={!rating || !pic || !highlight}>Submit</button>
            </div>
        </form>
    )
}