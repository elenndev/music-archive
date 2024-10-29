import { useEffect, useState } from "react"
import SVG_lastFm from "../../../components/SVG_lastFm"
import SVG_spotify from "../../../components/SVG_spotify"
import FeaturedAlbum from "./Container_FeaturedAlbum"

// Images
import profileIcon from "./img/profile-icon.jpg"
import musicboardLogo from "../../../components/musicboard.png"
import supabase from "../../../components/static/auth"


const Aside = () => {
    const [featuredPlaylist, setFeaturedPlaylist] = useState<string>('3AqqJn20LczJtoaHjVLipe?utm_source=generator')

    const getPlaylistLink = async () => {
        const {data} = await supabase.from("blog-saves").select('*').eq("info_name", "featured_playlist")
        if (data && data.length > 0) {
            setFeaturedPlaylist(data[0].text_value)
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
                <a aria-label="Ler mais sobre o blog" href="/sobre-mim" className="profile-icon"><img alt="imagem de perfil do site que serve de link para pagina Sobre do site" src={profileIcon}></img></a>

                <span>
                    <a aria-label="Abrir perfil do Spotify" href="https://open.spotify.com/user/mwlwzw8omn3hdq27f8w9oa6fw?si=4tkY8qpMSTuWqHew85IarQ" target="_blank" rel="noopener norferrer" className="social-icons spotify"><SVG_spotify /></a>
                    <a aria-label="Abrir perfil do Lastfm" href="https://www.last.fm/user/GOTHMIKASA" target="_blank" rel="noopener norferrer" className="social-icons lastFm"><SVG_lastFm /></a>
                    <a aria-label="Abrir perfil do Musicboard" href="https://musicboard.app/mitskidasilva?rel=options" target="_blank" rel="noopener norferrer" className="social-icons musicBoard"><img alt="logo do musicboard" src={musicboardLogo}></img></a>
                </span>
            </div>
            <div className="container album_week">
                <p className="container-header">Albúm da semana</p>
                <FeaturedAlbum />
            </div>
            <div className="container featured_playlist">
                <p className="container-header">Playlist em destaque</p>
                {featuredPlaylist &&
                    <Iframe/>
                }
            </div>
        </aside>
    )
}

export default Aside