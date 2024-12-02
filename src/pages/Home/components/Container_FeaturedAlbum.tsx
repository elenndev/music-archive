import { useEffect, useState } from 'react';
import getToken from '../../../components/static/spotifyAuth';
import { getAlbumById } from '../../Dashboard/components/static/getAlbumById';
import { Album } from '../../Dashboard/components/Set_FeaturedAlbum';

//midia
import discoIcon from './img/disco-png.webp'
import SVG_spotify from '../../../components/SVG_spotify';

const FeaturedAlbum: React.FC = () => {
    const [token, setToken] = useState<string>("");
    const [featuredAlbum, setFeaturedAlbum] = useState<Album | null>(null);
    const release_year = featuredAlbum?.release_date.slice(0,4)


    const authenticate = async () => {
        const _token = await getToken();
        setToken(_token);
    };



    const fetchAlbum = async (token: string) => {
        try {
            const getAlbum = await getAlbumById(token);
            setFeaturedAlbum(getAlbum);
        } catch (error) {
        }
    };

    useEffect(() => {
        authenticate();
    }, []); 

    useEffect(() => {
        if (token) {
            fetchAlbum(token); 
        }
    }, [token]); 

    return (
        <>
            {featuredAlbum ? (
                <>
                    <span className='album-content'>
                        <span className='album-cover-area'>
                            <img src={featuredAlbum.images[0]?.url}  alt={`capa do album ${featuredAlbum.name} do artista ${featuredAlbum.artists}`} className='album-cover' title="capa do album" height="auto" width="auto"  />
                            <img src={discoIcon} className='album-disco' title='Disco' alt="Disco" width="auto" height="auto"/>
                        </span>
                        <span className='album-info'>
                            <p className='album-name'>{featuredAlbum.name}</p>
                            <p className='album-artist'>{featuredAlbum.artists[0].name}</p>
                            <p className='album-total_tracks'>{featuredAlbum.total_tracks} faixas • {release_year}</p>
                            <a aria-label="Abrir album em destaque no spotify" href={featuredAlbum.uri}><SVG_spotify/></a>
                        </span>
                    </span>
                </>               
            ) : (
                <p>Selecione um álbum para ver os detalhes</p>
            )}
        </>
    );
}

export default FeaturedAlbum;
