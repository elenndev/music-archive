import getToken from '../../../components/static/spotifyAuth';
import { useState, useEffect } from 'react';
import { getAlbumById } from '../../Dashboard/components/static/getAlbumById';
import axios from 'axios';
import submitBlogInfo from './static/submitBlogInfo';

export interface Album {
    id: string;
    name: string;
    artists: { name: string }[];
    images: { url: string }[];
    total_tracks: number;
    uri: string;
    release_date: string;
}

const Set_FeaturedAlbum: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [albums, setAlbums] = useState<Album[]>([]);
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    const [token, setToken] = useState<string>('');

    // ALBUM EM DESTAQUE
    const [featuredAlbum, setFeaturedAlbum] = useState<Album | null>(null)

    const fetchAlbum = async (token: string) => {
        const getAlbum = await getAlbumById(token)
        setFeaturedAlbum(getAlbum)
    }

    const handleSubmitAlbum = async (submit_album: string) => {
        fetchAlbum(token)
        const result = submitBlogInfo("week album", null, submit_album)
        if (result == null){
            return false
        }
        if (result === 201){
            console.log("informação atualizada com sucesso")
        }
    }


    useEffect(() => {
        const authenticate = async () => {
            const _token = await getToken();
            setToken(_token);
        };
        authenticate();
    }, []);

    useEffect(() => {
        fetchAlbum(token)
    },[token])


    useEffect(() => {
        const searchAlbum = async () => {
            if (!query) {
                setAlbums([]);
                return;
            }
            try {
                const result = await axios.get(`https://api.spotify.com/v1/search`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        q: query,
                        type: 'album',
                    },
                });
                setAlbums(result.data.albums.items);

            } catch (error) {
                console.error('Erro ao buscar os álbuns:', error);
            }
        };


        const debounceSearch = setTimeout(() => {
            searchAlbum();
        }, 300);

        return () => clearTimeout(debounceSearch);
    }, [query, token]);

    return (
        <>
            <div className='featured-album' style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                <p className="container-header">Definir o albúm da semana</p>
                <span>
                    <div style={{ width: '30%' }}>
                        <h2>Pesquisar álbum</h2>
                        <input
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Digite o nome do álbum"
                        />
                    </div>
                    <div style={{ width: '30%' }} className="search-results">
                        <h2>Resultados</h2>
                        <ul>
                            {albums.map(album => (
                                <li
                                    key={album.id}
                                    onClick={async () => setSelectedAlbum(album)}
                                    style={{ cursor: 'pointer', marginBottom: '10px' }}
                                >
                                    {album.name} - {album.artists[0].name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={{ width: '30%' }} className="see-album">
                        {selectedAlbum ? (
                            <>
                                <div>
                                    <img alt={`capa do album ${selectedAlbum.name} do artista ${selectedAlbum.artists}`} src={selectedAlbum.images[0]?.url} style={{ width: '100%' }} />
                                    <h3>{selectedAlbum.name}</h3>
                                    <p>Artista: {selectedAlbum.artists[0].name}</p>
                                </div>

                                <button type='button' className='btn btn-primary handle_setFeaturedAlbum' onClick={() => handleSubmitAlbum(selectedAlbum.id)}>Definir album</button>
                            </>
                        ) : (
                            <p>Selecione um álbum para ver os detalhes</p>
                        )}
                    </div>
                </span>
            </div>
            <p>Album em destaque no momento</p>
            {featuredAlbum ? (
                <span className='see-definedAlbum'>
                    <span className='album-cover-area'>
                        <img src={featuredAlbum.images[0]?.url} alt={`capa do album ${featuredAlbum.name} do artista ${featuredAlbum.artists}`} className='album-cover' />
                    </span>
                    <span className='album-info'>
                        <p className='album-name'>{featuredAlbum.name}</p>
                        <p className='album-artist'>{featuredAlbum.artists[0].name}</p>
                        <p className='album-total_tracks'>{featuredAlbum.total_tracks} faixas</p>
                    </span>
                </span>
            ) : (
                <p>Carregando o album</p>
            )}
        </>
    );
};

export default Set_FeaturedAlbum;
