import {useState} from "react";
import {register} from "../Services/AuthServices";

type Props = {
    onSwitchToLogin: () => void;
}

function Register({onSwitchToLogin}: Props){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [role,setRole] = useState("");

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        try {
            await register({name,email,password,role});
            alert("Registration successful! Please login.");
            onSwitchToLogin();
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Registration failed");
        }
    }   
    return(
        <div className="auth-shell">
            <form className="auth-card" onSubmit={handleSubmit}>
                <div className="auth-brand">
                    <div className="brand-mark">TS</div>
                    <div>
                        <h2>Create account</h2>
                        <p>Join TalentSpark and get started</p>
                    </div>
                </div>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" required/>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required/>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required/>
                <input type="text" value={role} onChange={(e)=>setRole(e.target.value)} placeholder="Role" required/>
                <button className="auth-submit" type="submit">Register</button>
                <p className="auth-switch">
                    Already have an account? <button type="button" onClick={onSwitchToLogin}>Login</button>
                </p>
            </form>
        </div>
    )
}

export default Register;