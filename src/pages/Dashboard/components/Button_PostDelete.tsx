import React, { useContext, useEffect, useState } from "react"
import { DashboardContext } from "./Context_Dashboard"
import { checkAuth } from "../../../middleware"
import axios from 'axios';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;



const Button_PostDelete: React.FC<{id: string }> = ({ id }) =>{
    const context = useContext(DashboardContext)
    if (!context){
        console.error('DashboardContext não está disponível')
        return null
    }

    const {setOnDeletePost, onDrafts} = context
    const [draftOrPost, setDraftOrPost] = useState("")

    const handleDeletePost = async () => {
        const auth = await checkAuth()
        if(auth.data.status_code !== 200){
            window.alert("Erro ao deletar publicação/rascunho | token inválido")
            return
        } else {
            const confirmDelete = window.confirm(`Tem certeza que deseja excluir ${onDrafts? "este rascunho?" : "essa publicação?"}`)
            if(draftOrPost != ""){
                if (confirmDelete){
                    const response = await axios.delete(`${SERVER_URL}/delete-${draftOrPost}`,{
                        params: {
                            get_id: id
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
    }


    useEffect(() => {
        if(onDrafts){
            setDraftOrPost("draft")
        } else {
            setDraftOrPost("post")
        }
    },[onDrafts])

    return( 
        <button className="btn btn-danger" onClick={handleDeletePost}><p>Deletar</p></button>
    )
}

export default Button_PostDelete