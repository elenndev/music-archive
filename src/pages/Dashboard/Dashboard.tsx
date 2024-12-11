import { useContext, useEffect, useState } from "react"
import './components/static/Dashboard.css'
import AllPosts from "../AllPosts/AllPosts"
import Header from '../../components/Header.tsx';
import Footer from '../../components/Footer.tsx';
import { DashboardContext, DashboardProvider } from "./components/Context_Dashboard"
import Form_post from "./components/Form_post"
import Set_FeaturedAlbum from "./components/Set_FeaturedAlbum"
import Iframe from "../../components/EmbedPlaylist"
import submitBlogInfo from "./components/static/submitBlogInfo"

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../components/static/themes.js";
import GlobalTheme from "../../components/static/globals.js";
import axios from "axios";
import getTheme from "../../components/static/getTheme.js";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;


const Dashboard = () => {
    const style: React.CSSProperties = {
        width: '100%',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
    const [postId, setId] = useState("")
    const handleButtonEdit = (id: string) => {
        setId(id)
    }

    const [featuredPlaylist, setFeaturedPlaylist] = useState<string | null>('3AqqJn20LczJtoaHjVLipe?utm_source=generator')
    const getFeaturedPlaylist = async()=>{  
        const response = await axios.get(`${SERVER_URL}/fast-infos`, {
            params: {
                info_name: "featured_playlist"
            }
        })
        if (response.data){
            setFeaturedPlaylist(response.data.text_value)
        } else {
            setFeaturedPlaylist("Playlist não definida")
        }

    
    }
    async function handleSubmitPlaylist(event: React.FormEvent){
        const result = await submitBlogInfo("featured playlist",event, null)
        if (result == null){
            return false
        }
        if (result === 201){
            console.log("informação atualizada com sucesso")
            getFeaturedPlaylist()
        }
        
    }

    const [theme, setTheme] = useState(localStorage.getItem("theme") || getTheme())
    const updateStorageChange = () => {
        const currentTheme = localStorage.getItem("theme") || getTheme();
        setTheme(currentTheme);
    };
    
    const handleChangeTheme = (newTheme: string) => {
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
    }

    const context = useContext(DashboardContext)
    if (!context){
        throw new Error("DashboardContext não está disponível")}
    const {setOnDrafts} = context

    useEffect(() => {
        window.addEventListener("storage", (event) => {
            if (event.key === "theme") {
                updateStorageChange();
            }
        });
        setOnDrafts(false)
        updateStorageChange()
        getFeaturedPlaylist()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalTheme />
            <Header onChangeTheme={handleChangeTheme}/>
            <main style={style}>
                <DashboardProvider>
                    <Set_FeaturedAlbum />
                    <div className="featured-playlist">
                        <p className="container-header">Definir playlist em destaque</p>
                        <form onSubmit={handleSubmitPlaylist}>
                            <label>Informe o link da sua playlist:</label>
                            <input type="url" name="playlist-link" className="playlist-link" placeholder="Link da playlist"></input>
                            <button type="submit" className="btn btn-primary">Enviar</button>
                        </form>
                        <span className="see-playlist">
                            <p>Playlist em destaque atual</p>
                            {featuredPlaylist?
                                <Iframe playlist={featuredPlaylist}/>
                            : <p>Carregando playlist</p>}
                        </span>
                    </div>
                    <p className="container-header post-form">Criar uma nova publicação</p>
                    <Form_post post_id={postId} />
                    <AllPosts
                        isDashboard={true}
                        functionEdit={handleButtonEdit} />
                </DashboardProvider>
            </main>
            <Footer/>
        </ThemeProvider>
        </>
    )
}

export default Dashboard

