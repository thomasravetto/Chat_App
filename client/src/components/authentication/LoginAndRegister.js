function Login(props) {
    return (
        <div className='login_and_register_form'>
            <div className="form-container sign-up-container">
                <form action="#">
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <a href="https://localhost:3500/v1/auth/google" className="google-btn">
                            <img className="google-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                            <p className="btn-text"><b>Sign up with Google</b></p>
                        </a>
                    </div>
                    <span>or use your email for registration</span>
                    <input className='input_form' type="text" placeholder="Name" />
                    <input className='input_form' type="email" placeholder="Email" />
                    <input className='input_form' type="password" placeholder="Password" />
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form action="#">
                    <h1>Sign in</h1>
                    <div className="social-container">
                        <a href="https://localhost:3500/v1/auth/google" className="google-btn">
                            <img className="google-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                            <p className="btn-text"><b>Continue with Google</b></p>
                        </a>
                    </div>
                    <span>or use your account</span>
                    <input className='input_form' type="email" placeholder="Email" />
                    <input className='input_form' type="password" placeholder="Password" />
                    <a href="#">Forgot your password?</a>
                    <button>Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn" onClick={props.handleClick}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start your journey with us</p>
                        <button className="ghost" id="signUp" onClick={props.handleClick}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
     )
}

export default Login;