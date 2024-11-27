import Editor from "./Editor"
import SubmitForm from "./static/submitPostForm"
import Button_CancelPostEdit from "./Button_CancelPostEdit"
import { useContext, useState } from "react"
import { DashboardContext} from "./Context_Dashboard"
import { checkAuth } from "../../../middleware"
import axios from "axios"
const SERVER_URL = import.meta.env.VITE_SERVER_URL;


const Form_post: React.FC<{
    post_id?: string
}> = ({ post_id }) => {
    let forSubmit_IsDraft = false
    let forSubmit_OnEdit = false

    const style = {
        width: '900px',
        marginTop: '20px'
    }

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitFail, setIsSubmitFail] = useState(false)
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)
    
    const context = useContext(DashboardContext)
    if (!context) {
        throw new Error("DashboardContext não está disponível.");
    }
    const { onEdit, onDrafts ,setOnDrafts ,setEditMode, setOnSubmittedPost, isDraft, setIsDraft} = context

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const button =  (event.nativeEvent as SubmitEvent).submitter
        // verififcar se esta lidando com a criação/edição de uma publicação ou um rascunho
        if(button){
            if (button.classList.contains('draft')){
                forSubmit_IsDraft = true
                setIsDraft(true)

                if(onEdit){
                    // rascunho que foi editado e vai ser salvo
                    forSubmit_OnEdit = true
                } else (
                    // novo rascunho
                    forSubmit_OnEdit = false
                )
            } else {
                forSubmit_IsDraft = false

                if (onEdit){
                    // publicação que está sendo editada
                    forSubmit_OnEdit = true
                } else {
                    // nova pub
                    forSubmit_OnEdit = false
                }

                // verificar se é um rascunho que vai ser enviado como publicação ou uma publicação criada direto
                if (isDraft){

                    // deletar o rascunho depois cria a publicação
                    const auth = await checkAuth()
                    if (auth.data.status_code !== 200){
                        window.alert('Token inválido')
                        return
                    } else {
                        const response = await axios.delete(`${SERVER_URL}/delete-draft`, {
                            params: {get_id: post_id}
                        })
                        if (!response){
                            window.alert('erro ao deletar rascunho')
                            return
                        }

                        post_id = undefined
                        setIsDraft(false)
                        setEditMode(false)
                        forSubmit_IsDraft = false
                        forSubmit_OnEdit = false
                    }
                    
                }
            }
        }


        setIsSubmitting(true)
        setIsSubmitFail(false)
        setIsSubmitSuccess(false)
        try {            
            const result = await SubmitForm(event, forSubmit_OnEdit, forSubmit_IsDraft, post_id)
            if (result !== null){
                setIsSubmitting(true)
            }
            if (result === 200) {
                setIsSubmitSuccess(true)
                setOnSubmittedPost(true)
                post_id = undefined
                if(onDrafts && isDraft && !onEdit){
                    // se era um rascunho que foi enviado como publicação, o <AllPosts> vai ser recarregado pra mostrar as publicações agora com a nova publciação inclusa
                    setOnDrafts(false)
                }
                if (!onDrafts && isDraft){
                    // se <AllPosts> está na aba de publicações e foi criado um rascunho, ele ssera recarregado na aba de rascunhos agora com o rascunho novo
                    setOnDrafts(true)
                }

                if (onEdit){
                    setEditMode(false)
                }
            } else if (result === false){
                setIsSubmitSuccess(false)
                setIsSubmitFail(true)
                return
            }
        }finally {
            setIsSubmitting(false)
            
        }
    }

    




    return (
        <>
            <form onSubmit={handleSubmit} style={style} id="form_post">
                <Editor />
                <label>Capa da publicação:</label>
                <input name="cover" type="url" id="cover" placeholder="Insira a a url da imagem"></input>
                <input name="cover_description" type="text" id="cover_description" placeholder="Faça uma descrição da imagem"></input>
                {isSubmitFail && <p style={{ color: 'red' }}>{isSubmitFail}</p>}
                {isSubmitSuccess && <p style={{ color: 'green' }}>{isSubmitSuccess}</p>}
                
                <span className="buttons-area">
                    {!(onEdit && !isDraft) &&
                        <button className="btn btn-secondary draft"
                            id="form_submit"
                            type="submit"
                            disabled={isSubmitting}>
                            {isSubmitting
                                ? <>Salvando...</>
                                : <>Salvar rascunho</>}
                        </button>
                    }

                    <button className="btn btn-primary post"
                        id="form_submit"
                        type="submit"
                        disabled={isSubmitting}>
                        {onEdit && !isDraft
                            ? (isSubmitting
                                ? <>Salvando...</>
                                : <>Salvar alterações</>)
                            : (isSubmitting
                                ? <>Salvando...</>
                                : <>Enviar publicação</>)
                        }
                    </button>
                    {onEdit && !isSubmitting && <Button_CancelPostEdit />}
                </span>

                
            </form>
        </>
    )
}

export default Form_post