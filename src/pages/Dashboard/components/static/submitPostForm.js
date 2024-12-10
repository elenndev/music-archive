import cleanForm from "./cleanForm"
import exitEditMode from "./exitEditMode"
import { checkAuth } from "../../../../middleware";
import axios from 'axios';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;


const SubmitForm = async (event, onEdit, isDraft, postId) => {
    event.preventDefault()

    const draftOrPost = (isDraft? 'draft' : 'post')
    const createOrUpdate = (onEdit? 'put' : 'post')
    const auth = await checkAuth()
    if (auth.data.status_code !== 200){
        return 401
    } else {
        const form_submit = document.querySelector('#form_submit')
        const cover = document.querySelector('#cover').value
        const cover_description = document.querySelector("#cover_description").value
        const editor = document.querySelector('div.ql-editor')
        let id = postId
        // guardar o titulo pra verificar e adicionar no editor novamente caso o submit tenha erro
        const title_h1 = editor.querySelector("h1")
    
        if (draftOrPost == 'post') {
            if (!(cover.endsWith('webp'))) {
                alert('Imagem com formato inválido, por favor tente usar uma imagem de formato webp')
                return false
            } else if (cover_description.length < 5) {
                alert('Por favor preencha corretamente o campo da descrição da capa da publicação')
                return
            }
        }
    
        if (editor.querySelectorAll("h1").length < 1) {
            alert('Seu post deve possuir um título! (h1)')
            return
        } else if (!/[^\s]/.test(title_h1.textContent.trim())) {
            alert('Seu titulo está vazio')
            return
        } else if (editor.querySelectorAll('h1').length > 1) {
            const header = document.querySelectorAll('h1')
    
            const removeTag = Array.from(header)
            removeTag.shift()
    
            removeTag.forEach(function (changeTag) {
                const h2 = document.createElement('h2')
                h2.textContent = changeTag.textContent
                changeTag.replaceWith(h2)
            })
            return
        }
    
        //Formatar conteudos para o submit
        let result = null
        const title = editor.querySelector("h1").innerHTML
        editor.removeChild(editor.querySelector("h1"))
        const content = editor.innerHTML
        let data = {
            cover: cover,
            cover_description: cover_description,
            title: title,
            content: content,
            created_at: new Date()
        }
        // faz a req adequada pro tipo de conteudo
        if (createOrUpdate == 'post') {
            try{
                const response = await axios.post(`${SERVER_URL}/create-${draftOrPost}`, data)
                if (response.status == 201){
                    console.log(response)
                    cleanForm()
                    return response.status
                }
            }catch(error){
                console.log(error)
                editor.insertBefore(title_h1, editor.firstChild)
                window.alert(error.response.data)
            }
        } else if (createOrUpdate == 'put') {
            try{
                const response = await axios.put(`${SERVER_URL}/update-${draftOrPost}`,data,{
                    params: {
                        get_id: postId
                    },
                    headers: { 
                        'Content-Type': 'application/json' 
                    }
                })
                if (response.status == 201) { 
                    cleanForm()
                    return response.status
                }
                
            } catch(error){
                console.log(error)
                editor.insertBefore(title_h1, editor.firstChild)
                window.alert(error.response.data)
                return false
            }
        }

    }
    


}


export default SubmitForm