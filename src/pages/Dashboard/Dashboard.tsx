import AllPosts from "../AllPosts/AllPosts"
import Form_pots from "./components/Form_post"
import '../../All_posts.css'

const Dashboard = () => {
    const style:  React.CSSProperties = {
        width: '100%', 
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
    return(
        <main style={style}>
            <Form_pots/>
            <AllPosts isDashboard={true}/>
        </main>
    )
}

export default Dashboard
