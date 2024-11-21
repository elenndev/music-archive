import React, { useContext, useState } from "react"
import { DashboardContext } from "./Context_Dashboard"
import axios from 'axios';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;



const Button_PostDelete: React.FC<{id: string }> = ({ id }) =>{
    const context = useContext(DashboardContext)
    if (!context){
        console.error('DashboardContext não está disponível')
        return null
    }

    const {setOnDeletePost, onDrafts} = context
    const [reqURL, setReqURL] = useState("")

    const handleDeletePost = async () => {
        if(onDrafts){
            setReqURL("draft")
        } else {
            setReqURL("post")
        }
        const confirmDelete = window.confirm("Tem certeza que deseja excluir essa publicação?")
        if(reqURL != ""){
            if (confirmDelete){
                const full_token = localStorage.getItem('token')
                const response = await axios.delete(`${SERVER_URL}/delete-${reqURL}`,{
                    params: {
                        get_id: id
                    },
                    headers: {
                        Authorization: `Bearer ${full_token}`
                    }
                })
                if (!response){
                    return false
                } else{
                    setOnDeletePost(true)
                    return 200
                }
    
            }
        }

    }

    return( 
        <button className="btn btn-danger" onClick={handleDeletePost}><p>Deletar</p></button>
    )
}

export default Button_PostDelete