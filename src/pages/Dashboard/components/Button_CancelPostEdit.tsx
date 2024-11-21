
import { useContext } from "react";
import { DashboardContext } from "./Context_Dashboard"
import cleanForm from "./static/cleanForm"


const Button_CancelPostEdit = () => {
    const context = useContext(DashboardContext);

    if (!context) {
        console.error("DashboardContext não está disponível.");
        return null;
    }
    const { setEditMode } = context;
    function exitEdit(){
        cleanForm()
        setEditMode(false)
    }

    return(
        <button type="button" className="btn btn-danger" onClick={exitEdit}>Cancelar edição</button>
    )
}

export default Button_CancelPostEdit