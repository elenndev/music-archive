import SVG_lastFm from "../../../components/SVG_lastFm"
import SVG_musicBoard from "../../../components/SVG_musicBoard"
import SVG_spotify from "../../../components/SVG_spotify"
import FeaturedAlbum from "./Container_FeaturedAlbum"

// Midia
import profileIcon from "./img/profile-icon.jpg"
// import spotifySvg from "./img/Spotify.svg"
// import lastFmSvg from "./img/LastFM.svg"
// import musicBoardSvg from "./img/musicBoard.svg"


const Aside = () => {
    return(
        <aside>
            <div className="container profile">
                <a href="#" target="_blank" rel="noopener norferrer" className="profile-icon"><img  src={profileIcon}></img></a>
                    
                <span>
                    <a href="https://open.spotify.com/user/mwlwzw8omn3hdq27f8w9oa6fw?si=4tkY8qpMSTuWqHew85IarQ" target="_blank" rel="noopener norferrer" className="social-icons spotify"><SVG_spotify/></a>
                    <a href="https://www.last.fm/user/GOTHMIKASA" target="_blank" rel="noopener norferrer" className="social-icons lastFm"><SVG_lastFm/></a>
                    <a href="https://musicboard.app/mitskicomunista?rel=copy" target="_blank" rel="noopener norferrer" className="social-icons musicBoardSvg"><SVG_musicBoard/></a>
                </span>
            </div>
            <div className="container album_week">
                <h3 className="container-header">Albúm da semana</h3>
                <FeaturedAlbum/>
            </div>
            <div className="container featured_playlist">
                <h3>Playlist em destaque</h3>
                <iframe style={{borderRadius: '12px'}} src="https://open.spotify.com/embed/playlist/0snxfBB1S70xJTSxHpoJOi?utm_source=generator&theme=0" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
        </aside>
    )
}

export default Aside