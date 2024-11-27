import { useContext } from "react"
import { DashboardContext } from "./Context_Dashboard"
import cleanForm from "./static/cleanForm"

const Button_GoToDrafts = () =>{
    const context = useContext(DashboardContext)
    if (!context){
        console.error("DashboardContext não está disponível")
        return null
    }
    const {onDrafts, setOnDrafts, setIsDraft, setEditMode} = context
    const handleSetOnDrafts = () => {
        if(onDrafts){
            setOnDrafts(false)
            setIsDraft(false)
            setEditMode(false)
            cleanForm()
        } else {
            setOnDrafts(true)
        }
    }



    return(
        <button className="btn btn-primary" onClick={handleSetOnDrafts}>{!onDrafts? "Ver rascunhos" : "Sair dos rascunhos"}</button>
    )
}

export default Button_GoToDrafts