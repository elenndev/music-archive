import './components/static/about_me.css'
import SVG_spotify from '../../components/SVG_spotify'
import SVG_lastFm from '../../components/SVG_lastFm'
import SVG_email from '../../components/SVG_email'
import SVG_github from '../../components/SVG_github'

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../components/static/themes.js";
import GlobalTheme from "../../components/static/globals.js";
import { Helmet } from "react-helmet-async";


// Images
import profileIcon from "../../components/profile-icon.webp"
import musicboardLogo from "../../components/musicboard.webp"
import { useEffect, useState } from 'react'
import Header from '../../components/Header.js'
import Footer from '../../components/Footer.js'
import getTheme from '../../components/static/getTheme.js'

const AboutMe = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || getTheme())
    const updateStorageChange = () => {
        const currentTheme = localStorage.getItem("theme") || getTheme();
        setTheme(currentTheme);
    };
    const handleChangeTheme = (newTheme: string) => {
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
    }
    
    useEffect(()=> {
        window.addEventListener("storage", (event) => {
            if (event.key === "theme") {
                updateStorageChange();
            }
        });
        updateStorageChange()
    }, [])

    return(
        <>
        <Helmet>
            <title>Todas as publicações</title>
            <link rel="canonical" href="https://music-archive-blog.vercel.app/todas-publicacoes/"/>
            <meta
                name="description"
                content="Pagina Sobre do blog Music Archive: Comentando e recomendando músicas e playlists"
            />
        </Helmet>
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalTheme />
            <Header onChangeTheme={handleChangeTheme} />
            <main className="container about-me">
                <img role="none" className='profile' src={profileIcon}></img>
                <h1>Boas vindas ao meu blog !</h1>
                <p className='info'>Criei este blog com o intuito de falar sobre música e principalmente colocar em prática os meus estudos em programação enquanto o desenvolvo, além de também conhecer pessoas de ambas as áreas para se conectar! Se você quiser, fique à vontade para puxar um papo seja sobre música, programação, suas opiniões, sugestões etc. <br></br>Mais informações nos links abaixo:</p>
                <span className='links'>
                    <a aria-label="Entrar em contato por e-mail" href='mailto:elen.damares774@gmail.com' target="_blank" rel="noopener norferrer" className='btn btn-primary transparent'><SVG_email/> Email</a>
                    <a aria-label="Abrir perfil do github" href='https://github.com/elenndev' target="_blank" rel="noopener norferrer" className='btn btn-primary transparent'><SVG_github/> GitHub</a>
                    <a aria-label="Abrir perfil do spotify" href="https://open.spotify.com/user/mwlwzw8omn3hdq27f8w9oa6fw?si=4tkY8qpMSTuWqHew85IarQ" target="_blank" rel="noopener norferrer" className='btn btn-primary transparent'><SVG_spotify/>Spotify</a>
                    <a aria-label="Abrir perfil do musicboard" className='btn btn-primary transparent'><img alt="logo do musicboard" className='musicboard' src={musicboardLogo}></img>MusicBoard</a>
                    <a aria-label="Abrir perfil do lastfm" href="https://www.last.fm/user/GOTHMIKASA" target="_blank" rel="noopener norferrer" className='btn btn-primary transparent'><SVG_lastFm/>LastFm </a>
                </span>
            </main>
            <Footer/>
        </ThemeProvider>
        </>
    )
}
export default AboutMe