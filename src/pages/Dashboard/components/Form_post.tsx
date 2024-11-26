import Editor from "./Editor"
import SubmitForm from "./static/submitPostForm"
import Button_CancelPostEdit from "./Button_CancelPostEdit"
import { useContext, useEffect, useState } from "react"
import { DashboardContext} from "./Context_Dashboard"

const Form_post: React.FC<{
    post_id?: string
}> = ({ post_id }) => {
    const [reqType, setReqType] = useState('')
    let id = ""


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
    const { onEdit, setEditMode, setOnSubmittedPost, isDraft} = context

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        let draftOrPost = ''
        const button =  (event.nativeEvent as SubmitEvent).submitter
        if(button){
            if (button.classList.contains('draft')){
                console.log('draft')
                draftOrPost = 'draft'
                setReqType('draft')
            } else {
                draftOrPost= 'post'
                setEditMode(false)
                setReqType('post')
            }
        }


        setIsSubmitting(true)
        setIsSubmitFail(false)
        setIsSubmitSuccess(false)
        try {
            if(post_id){ id=post_id}
            
            const result = await SubmitForm(event, reqType, draftOrPost, id , context)
            if (result !== null){
                setIsSubmitting(true)
            }
            else if (result === 200 || result === 201 || result === 204) {
                setIsSubmitSuccess(true)
            } else {
                setIsSubmitFail(true)
                return
            }
        }finally {
            setIsSubmitting(false)
            setOnSubmittedPost(true)
            if (onEdit){
                setEditMode(false)
            }
        }
    }

    

    useEffect(() => {
        if (!onEdit){
            setIsSubmitFail(false)
            setIsSubmitSuccess(false)
        }
        if (onEdit) {
            setReqType('put')
            if (post_id) { id = post_id }
            
        } else {
            setReqType('post')
        }    
    }, [onEdit]);




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