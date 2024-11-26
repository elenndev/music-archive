import { useNavigate } from "react-router-dom"
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;

const Button_SignOut: React.FC = () =>{
    const navigate = useNavigate()
    async function handleSignOut (){
        try{
            const response = await axios.post(`${API_URL}/logout`,{},{withCredentials: true})
            if (response.data.status_code == 200){
                navigate('/blog-login')
            }
        } catch(error: any){
            console.error('Erro ao fazer o logout | Erro: ', error.response.data.detail)
        }



    }
    return(
        <button className="btn btn-primary" onClick={handleSignOut}>Sign out</button>
    )
}

export default Button_SignOut