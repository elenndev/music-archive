import type Model_Post from "../../components/InterfacePost"

import { useEffect, useState } from "react"
import Content_Post from "../../components/Content_Post"
import Header from '../../components/Header.tsx';
import Footer from '../../components/Footer.tsx';
import { Link, useParams } from "react-router-dom"
import './ReadPost.css'

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../components/static/themes.js";
import GlobalTheme from "../../components/static/globals.js";

import axios from 'axios';
import Title_Post from "../../components/Title_Post.tsx";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ReadPost: React.FC = () => {
    const ButtonStyle = {
        'width': 'fit-content',
        'padding': '5px 30px'
    }
    const {id} = useParams<{id: string}>()
    const [post, setPost] = useState<Model_Post>()
    const [loading, setLoading] = useState(true)


    const getData = async () =>{
        const response = await axios.get(`${SERVER_URL}/get-post`,{
            params: {
                get_id: id
            }
        })
        if (response.data){
            setPost(response.data);
            setLoading(false);
        }
        

    }

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark")

    const updateStorageChange = () => {
        const currentTheme = localStorage.getItem("theme");
        setTheme(currentTheme || "dark");
    };
    const handleChangeTheme = (newTheme: string) => {
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
    }

    useEffect(() => {
        getData()
        updateStorageChange()
        window.addEventListener("storage", (event) => {
            if (event.key === "theme") {
                updateStorageChange();
            }
        });

    }, [])

    if (loading){
        return ( 
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalTheme />
                <p>Carregando publicação</p>
        </ThemeProvider>)
        
    }

    return(
        <>
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalTheme />
            <Header onChangeTheme={handleChangeTheme}/>
            <main>  { post && 
                    <article className="container read-post" key={post._id}>
                        <Title_Post title={post.title} />
                        <img src={post.cover}></img>
                        <Content_Post content={post.content}/>
                        <Link to={'/todas-publicacoes'} className="btn btn-secondary" style={ButtonStyle}>Voltar</Link>
                    </article>}
                {/* {post.map((e) => (

                ))} */}
            </main>
            <Footer />
        </ThemeProvider>
        </>
    )
}

export default ReadPost