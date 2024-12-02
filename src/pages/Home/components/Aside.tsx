import { useEffect, useState } from "react"
import SVG_lastFm from "../../../components/SVG_lastFm"
import SVG_spotify from "../../../components/SVG_spotify"
import FeaturedAlbum from "./Container_FeaturedAlbum"
import axios from "axios";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// Images
import profileIcon from "../../../components/profile-icon.webp"
import musicboardLogo from "../../../components/musicboard.webp"


const Aside = () => {
    const [featuredPlaylist, setFeaturedPlaylist] = useState<string>('')

    const getPlaylistLink = async () => {
        const response = await axios.get(`${SERVER_URL}/fast-infos`,{
            params: {
                info_name: "featured_playlist"}})

        if (response.data) {
            setFeaturedPlaylist(response.data.text_value)
        } else {
            return
        }
    }

    useEffect(() => {
        getPlaylistLink()
    }, [])

    const Iframe = () => {
        return(
            <iframe
                        title="Playlist em destaque"
                        style={{ borderRadius: '12px', border: 'none'}}
                        src={featuredPlaylist}
                        width="90%"
                        height="352"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>
        
        )
    }
    return (
        <aside>
            <div className="container profile">
                <a aria-label="Ler mais sobre o blog" href="/sobre-mim" className="profile-icon"><img loading="lazy" title="icone de perfil do blog" width="auto" height="auto" alt="imagem de perfil do site que serve de link para pagina Sobre do site" src={profileIcon}></img></a>

                <span>
                    <a aria-label="Abrir perfil do Spotify" href="https://open.spotify.com/user/mwlwzw8omn3hdq27f8w9oa6fw?si=4tkY8qpMSTuWqHew85IarQ" target="_blank" rel="noopener norferrer" className="social-icons spotify"><SVG_spotify /></a>
                    <a aria-label="Abrir perfil do Lastfm" href="https://www.last.fm/user/GOTHMIKASA" target="_blank" rel="noopener norferrer" className="social-icons lastFm"><SVG_lastFm /></a>
                    <a aria-label="Abrir perfil do Musicboard" href="https://musicboard.app/mitskidasilva?rel=options" target="_blank" rel="noopener norferrer" className="social-icons musicBoard"><img loading="lazy" title="logo da rede social musicboard" width="50px" height="50px"  alt="logo do musicboard, circulo azul com um disco amarelo saindo de uma caixa branca com pouca opacidade" src={musicboardLogo}></img></a>
                </span>
            </div>
            <div className="container album_week">
                <p className="container-header">Albúm da semana</p>
                <FeaturedAlbum />
            </div>
            <div className="container featured_playlist">
                <p className="container-header">Playlist em destaque</p>
                {featuredPlaylist !== '' &&
                    <Iframe/>
                }
            </div>
        </aside>
    )
}

export default Aside