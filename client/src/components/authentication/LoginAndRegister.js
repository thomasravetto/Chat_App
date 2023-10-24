import { useState } from 'react';

import GoogleLogo from '../../google_logo.png';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://localhost:3500/v1';

function LoginAndRegister(props) {

    const navigate = useNavigate();


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login_error, setLoginError] = useState('');

    function onUsernameChange (event) {
        setUsername(event.target.value);
    }

    function onEmailChange (event) {
        setEmail(event.target.value);
    }

    function onPasswordChange (event) {
        setPassword(event.target.value);
    }

    function handleClick () {
        props.changePanel();
        setTimeout(() => {
        setUsername('');
        setEmail('');
        setPassword('');
        setLoginError('');
        }, 250);
    }

    async function SubmitLogin () {
        const resp = await fetch(API_URL + '/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await resp.json();
            if (data.username) {
                props.loadUser(data, () => {
                    navigate('/');
                });
            } else if (data.error) {
                setLoginError(data.error);
            } else {
                console.error(data);
            }
        }

    async function SubmitRegister () {
        const resp = await fetch(API_URL + '/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });
        const data = await resp.json();
        if (data.username) {
            props.loadUser(data, () => {
                navigate('/');
            });
        } else if (data.error) {
            setLoginError(data.error);
        } else {
            console.error(data);
        }
    }

    async function HandleGoogleOauthLogin () {
        const response = await fetch('https://localhost:3500/v1/auth/google');
        const data = await response.json();
        console.log(data);
    }

    return (
        <div className='login_and_register_form'>
            <div className="form-container sign-up-container">
                <form action="#">
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <button onClick={HandleGoogleOauthLogin} className="google-btn">
                            <img className="google-icon-svg" src={GoogleLogo}/>
                            <p className="btn-text"><b>Sign up with Google</b></p>
                        </button>
                    </div>
                    <span>or use your email for registration</span>
                    <div className='input_container'>
                        <input onChange={onUsernameChange} className='input_form' type="text" placeholder="Username" value={username}/>
                        <input onChange={onEmailChange} className='input_form' type="email" placeholder="Email" value={email} />
                        <input onChange={onPasswordChange} className='input_form' type="password" placeholder="Password" value={password}/>
                    </div>
                    <div className={`error_container ${login_error.length > 0 ? 'show_error' : ''}`}>{login_error}</div>
                    <button className='submit_button' onClick={SubmitRegister}>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form action="#">
                    <h1>Sign in</h1>
                    <div className="social-container">
                        <a href="https://localhost:3500/v1/auth/google" className="google-btn">
                            <img className="google-icon-svg" src={GoogleLogo}/>
                            <p className="btn-text"><b>Continue with Google</b></p>
                        </a>
                    </div>
                    <span>or use your account</span>
                    <div className='input_container'>
                        <input onChange={onEmailChange} className='input_form' type="email" placeholder="Email" value={email}/>
                        <input onChange={onPasswordChange} className='input_form' type="password" placeholder="Password" value={password}/>
                    </div>
                    <a href="#">Forgot your password?</a>
                    <div className={`error_container ${login_error.length > 0 ? 'show_error' : ''}`}>{login_error}</div>
                    <button className='submit_button' onClick={SubmitLogin}>Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="panel_button ghost" id="signIn" onClick={handleClick}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start your journey with us</p>
                        <button className="panel_button ghost" id="signUp" onClick={handleClick}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
     )
}

export default LoginAndRegister;