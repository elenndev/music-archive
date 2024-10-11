import axios from "axios"

const Button_PostDelete: React.FC <{id: number}> = ({id}) =>{
    const deletePost = async (id: number) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir esse post?")
        if (confirmDelete) {
            try{
                const response = await axios.delete(`https://music-archive-epi.onrender.com/delet-post/${id}`,{
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                alert("Post deletado com sucesso.")
            } catch(error){
                console.error("Erro: ", error)
                alert("Erro ao tentar deletar o post")
        }

    }
    return(
        <button type="button" className="btn btn-danger" onClick={deletePost}>Excluir</button>
    )
}

export default Button_PostDelete