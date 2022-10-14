import { useState } from "react";
import React  from "react";
import axios from "axios";

function Register(){
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    async function Submit(event) {
        event.preventDefault();
        console.log("Submitted" , name  , email , password);
        let {data} = await axios.post("http://localhost:1200/register",{
            'name':name,
            'email':email,
            'password':password
        });
        if(data.status === "ok"){
            alert("Account Created Please Verify the Account Sent in your Email")
            window.location = "/login"
        }
    }
    return (
        <div>
            <form onSubmit={Submit}>
                Name: <input name="name" onChange={e => setName(e.target.value)} />
                Email: <input name="email" onChange={e => setEmail(e.target.value)} />
                Password: <input name="password" onChange={e => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Register;
