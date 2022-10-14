import axios from "axios";
import react, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


function Login() {
    const [email, SetEmail] = useState('')
    const [password, SetPassword] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate('/')
        }
    }, [])
    async function SUbmit(e) {
        e.preventDefault();
        let { data } = await axios.post("http://localhost:1200/login", {
            'email': email,
            'password': password
        });
        console.log(data);
        if (data.status !== "ok") {
            alert(data.msg)
        } else {
            localStorage.setItem('user', data.token)
            window.location = "/"
        }
    }
    return (
        <div>
            <form onSubmit={SUbmit}>
                EMail: <input onChange={e => SetEmail(e.target.value)} /><br />
                Password: <input onChange={e => SetPassword(e.target.value)} />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default Login;