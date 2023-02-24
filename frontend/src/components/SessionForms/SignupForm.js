import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';

function SignupForm() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const errors = useSelector(state => state.errors.session);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    const update = field => {
        let setState;

        switch (field) {
            case 'email':
                setState = setEmail;
                break;
            case 'name':
                setState = setName;
                break;
            case 'password':
                setState = setPassword;
                break;
            case 'password2':
                setState = setPassword2;
                break;
            default:
                throw Error('Unknown field in Signup Form');
        }

        return e => setState(e.currentTarget.value);
    }

    const userSubmit = e => {
        e.preventDefault();
        const user = {
            email,
            name,
            password
        };

        dispatch(signup(user));
    }

    return (
        <form className="session-form" onSubmit={userSubmit}>
            <h2>Signup</h2>
            <div className="errors">{errors?.email}</div>
            <label>
                <span>Email</span>
                <input type="text"
                    value={email}
                    onChange={update('email')}
                    placeholder="Email"
                />
            </label>
            <div className="errors">{errors?.name}</div>
            <label>
                <span>Name</span>
                <input type="text"
                    value={name}
                    onChange={update('name')}
                    placeholder="Name"
                />
            </label>
            <div className="errors">{errors?.password}</div>
            <label>
                <span>Password</span>
                <input type="password"
                    value={password}
                    onChange={update('password')}
                    placeholder="Password"
                />
            </label>
            <div className="errors">
                {password !== password2 && 'Confirm Password field must match'}
            </div>
            <label>
                <span>Confirm Password</span>
                <input type="password"
                    value={password2}
                    onChange={update('password2')}
                    placeholder="Confirm Password"
                />
            </label>
            <button
                className='submit-button'
                disabled={!email || !password || password !== password2}
            >Signup</button>
        </form>
    );
}

export default SignupForm;