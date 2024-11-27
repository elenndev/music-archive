import axios from 'axios'
import { useEffect, useState } from "react";
import Button_SignOut from "../Dashboard/components/Button_SignOut";
import { Navigate, useNavigate} from "react-router-dom";
import { checkAuth } from "../../middleware";
import "./Login.css"
const API_URL = import.meta.env.VITE_API_URL;


export default function Login() {
    const navigate = useNavigate()
    const [session, setSession] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isloading, setIsLoading] = useState(true)
    

    async function getSession(){
        const checkSession = await checkAuth();
        if (checkSession.data.status_code !== 200){
            setSession(false)
            setIsLoading(false)
        } else {
            setSession(true);
            setIsLoading(false)
        }
        
    };


    const handleLogin = async(e) =>{
        setIsLoading(true)
        e.preventDefault()
        const body = {
            username: username,
            password: password
        }
        try{
            const response = await axios.post(`${API_URL}/login`, body, {withCredentials: true})
        } catch (error){
            window.alert(error.response.data.detail )
        }
        setUsername("")
        setPassword("")
        getSession()
    }

    useEffect(() => {
        getSession()
    }, []);


    if(isloading){
        return(<p>Carregando...</p>)
    }

    if (!session) {
        return (
            <div
                style={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div>
                    <form id="login-form" onSubmit={handleLogin}>
                        <label htmlFor="username">Usuário:</label>
                        <input type="text" name="username" value={username} 
                        onChange={(e) => setUsername(e.target.value)} placeholder="Digite seu username"
                        required></input>
                        <label htmlFor="password">Senha:</label>
                        <input type="password" name="input_password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Digite sua senha"
                        required></input>
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        );
    } else{
        return <Navigate to="/dashboard" />
    }
}
