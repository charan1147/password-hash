import { useState } from "react";
import { Link } from "react-router-dom";
import './Login.css';  

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                 <h1>Login</h1>
                <div>
                    <label>Enter your Email
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>Enter Your password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
            <Link to="/forget-password">Forget Password?</Link>
        </div>
    );
}

export default Login;
