import axios from "axios"
import React from "react"


const Button_PostDelete: React.FC<{id: number }> = ({ id }) =>{
    const key = import.meta.env.VITE_API_KEY
    const deletePost = async () => {
        try{
            const confirmDelete = window.confirm("Tem certeza que deseja excluir essa publicação?")

            if (confirmDelete){
                await axios.delete(`http://127.0.0.1:8000/delete-post/${id}`,{
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${key}`
                    }
                })
                console.log("Post deletado com sucesso")
            } else {
                throw new Error ('Erro ao deletar Post')
            }
        } catch (error){
            console.error('Erro:', error);
        }
    }

    return( 
        <button className="btn btn-danger" onClick={deletePost}>Deletar</button>
    )
}

export default Button_PostDelete