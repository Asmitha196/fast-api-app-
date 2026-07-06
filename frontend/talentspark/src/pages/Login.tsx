import {useState} from "react";
import {login} from "../Services/AuthServices";

type Props = {
    onLogin: (token: string) => void;
    onSwitchToRegister: () => void;
}

function Login({onLogin, onSwitchToRegister}: Props){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login({email,password});
            onLogin(response.access_token);
        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed");
        }
    }   
    return(
        <main className="auth-shell">
            <section className="auth-panel auth-panel-form">
                <form className="auth-card" onSubmit={handleSubmit}>
                    <div className="auth-brand">
                        <div className="brand-mark">TS</div>
                        <div>
                            <h2>Welcome back</h2>
                            <p>Sign in to continue to TalentSpark</p>
                        </div>
                    </div>

                    <div className="field-group">
                        <label htmlFor="email">Email address</label>
                        <input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="name@company.com" required/>
                    </div>

                    <div className="field-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" required/>
                    </div>

                    <div className="auth-links">
                        <a href="#">Forgot password?</a>
                    </div>

                    <button className="auth-submit" type="submit">Log in</button>

                    <p className="auth-switch">
                        Don't have an account? <button type="button" onClick={onSwitchToRegister}>Register</button>
                    </p>
                </form>
            </section>

            <section className="auth-panel auth-panel-showcase" aria-label="TalentSpark showcase">
                <div className="showcase-overlay" />
                <div className="showcase-content">
                    <div className="showcase-logo">TS</div>
                    <h3>TalentSpark</h3>
                    <p className="showcase-tag">Powering the Future of Talent</p>
                    <p className="showcase-copy">A modern platform for hiring teams, career growth, and intelligent talent operations.</p>
                </div>
            </section>
        </main>
    )
}

export default Login;