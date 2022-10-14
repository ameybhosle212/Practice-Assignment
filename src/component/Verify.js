import axios from "axios";
import react ,{useEffect} from "react"
import { useParams } from "react-router-dom";

function Verify(){
    let params = useParams()
    useEffect(()=>{
        async function getVerified() {
            let {data} = await axios.post("http://localhost:1200/verify",{
                'token':params.token
            })
            if(data.status === "ok"){
                alert(data.msg)
                window.location = "/login"
            }else{
                alert(data.msg)
            }
        }
        getVerified()
    })
    return (
        <div>
            
        </div>
    );
}

export default Verify;