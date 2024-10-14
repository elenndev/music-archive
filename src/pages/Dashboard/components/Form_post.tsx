import Editor from "./Editor"
import SubmitForm from "../../../../index"

const Form_post = () => {
    const style = {
        width: '900px',
        marginTop: '20px'
    }
    const submitStyle = {
        marginTop: '10px'
    }
    return(
        <form onSubmit={SubmitForm} style={style}>
            <Editor />
            <input type="url" id="cover" style={submitStyle}></input>
            <button className="btn btn-primary" id="form_submit" type="submit" style={submitStyle}>Enviar</button>
        </form>
    )
}

export default Form_post