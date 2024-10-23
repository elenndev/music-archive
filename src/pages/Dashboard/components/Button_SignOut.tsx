import supabase from "../../../components/static/auth"

const Button_SignOut = () =>{
    return(
        <button onClick={() => supabase.auth.signOut()}>Sign out</button>
    )
}

export default Button_SignOut