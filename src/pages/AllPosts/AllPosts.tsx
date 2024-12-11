import React, { useContext, useEffect, useState } from 'react';
import CardPost from './components/CardPost.tsx';
import './components/static/All_posts.css';
import Button_SignOut from '../Dashboard/components/Button_SignOut.tsx';
import FunctionGetId from '../Dashboard/components/Type_FunctionGetId.tsx';
import { DashboardContext } from '../Dashboard/components/Context_Dashboard.tsx';
import Model_Post from '../../components/InterfacePost.tsx';
import Header from '../../components/Header.tsx';
import Footer from '../../components/Footer.tsx';
import { checkAuth } from "../../middleware.js";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../components/static/themes.js";
import GlobalTheme from "../../components/static/globals.js";
import axios from 'axios';
import Button_GoToDrafts from '../Dashboard/components/Button_GoToDrafts.tsx';
import { Helmet } from "react-helmet-async";
import getTheme from '../../components/static/getTheme.js';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;



const AllPosts: React.FC<{isDashboard?: boolean,
functionEdit?: FunctionGetId
onEdit?: boolean    
}> = ({isDashboard = false, functionEdit}) => {
    const [posts, setPosts] = useState<Model_Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const context = useContext(DashboardContext)
    if (!context){
        throw new Error("DashboardContext não está disponível.");
    }

    const getData = async () => {
        if (onDrafts){
            const auth = await checkAuth()
            if (auth.data.status_code !== 200){ 
                setError("Token inválido")
                setLoading(false)
                return
            }

            try{
                const response = await axios.get(`${SERVER_URL}/get-drafts`,{
                    params: {
                        sort: 1
                    }
                })
                if (response.data){
                    setPosts(response.data)
                    setLoading(false)
                }

            }catch(error){
                console.error("Problemas ao acessar os dados: ", error)
            }
        } else {
            try{
                const response = await axios.get(`${SERVER_URL}/all-posts`,{
                    params: {
                        sort: 1
                    }
                })
                if (response.data){
                    setPosts(response.data);   
                    setLoading(false);
                } else if(!response.data){
                    setError("Publicações não disponíveis")
                }
            } catch(error){
                console.error("Erro ao acessar as publicações: ", error)
                return false
            }
        }

        
    };

    // THEME
    const [theme, setTheme] = useState(localStorage.getItem("theme") || getTheme())
    const updateStorageChange = () =>{
        const currentTheme = localStorage.getItem("theme")
        setTheme(currentTheme || getTheme())
    }

    const handleChangeTheme = (newTheme: string) => {
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
    }


    useEffect(() => {
        updateStorageChange()
        getData()
        window.addEventListener("storage", (event)=> {
            if (event.key === "theme"){
                updateStorageChange()
            }
        })
    }, []);
    
    // POSTS
    const {submittedPost, setOnSubmittedPost, deletePost, setOnDeletePost, onDrafts} = context
    
    useEffect(() => {
        if (submittedPost){
            getData()
            setOnSubmittedPost(false)
        }
    }, [submittedPost])

    useEffect(() => {
        if (deletePost){
            getData()
            setOnDeletePost(false)
        }
    }, [deletePost])

    useEffect(() => {
        getData()
        setLoading(true)
    }, [onDrafts])

    if (error) {
        return <p>{error}</p>;
    }

    if (loading){
        
        return(
            <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalTheme />
                <p>Carregando publicações</p>
            </ThemeProvider>
        ) 
    }


    const Container_AllPosts = () =>{
        return(
            <div className='container all-posts'>
            <div className='container_header'>
                <h2>Todos as publicações</h2>
                <span className="buttons_area">{isDashboard && <><Button_SignOut/><Button_GoToDrafts/></>}</span>
            </div>
            {loading && <p>Carregando publicações...</p>}
            <div className='card-container'>
                {posts.map((post) => (
                    <CardPost key={post._id}
                        post = {post}
                        isDashboard = {isDashboard}
                        functionEdit={functionEdit}
                    />
                ))}
            </div>
        </div>
        )
    }

    return (
        <>
        {isDashboard! && (
            <>
                <Helmet>
                    <title>Todas as publicações</title>
                    <link rel="canonical" href="https://music-archive-blog.vercel.app/todas-publicacoes/"/>
                    <meta
                        name="description"
                        content="Blog Music Archive: Comentando e recomendando músicas e playlists"
                    />
                </Helmet>
            </>
            
        )}
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalTheme />
            {isDashboard ? (
                <>
                    <Container_AllPosts/>
                </>
            ) : (
                <>
                    <Header onChangeTheme= {handleChangeTheme}/>
                    <main id='main_all-posts'><Container_AllPosts /></main>
                    <Footer/>
                </>
            )}
        </ThemeProvider>
        </>
    );
};


export default AllPosts;


