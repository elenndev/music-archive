
import { useContext } from "react";
import { EditModeContext } from "../components/Context_EditMode"
import cleanForm from "../static/cleanForm"


const Button_CancelPostEdit = () => {
    // const [onEdit, setOnEdit] = useState(true)
    const context = useContext(EditModeContext);

    if (!context) {
        // Trate o caso em que o contexto não é encontrado
        console.error("EditModeContext não está disponível.");
        return null;
    }
    const { setEditMode } = context;
    function exitEdit(){
        cleanForm()
        setEditMode(false)
        console.log('funcao cancelar edit')
    }

    return(
        <button type="button" className="btn btn-danger" onClick={exitEdit}>Cancelar edição</button>
    )
}

export default Button_CancelPostEdit