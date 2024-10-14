import React, { useEffect, useState } from 'react';
import CardPost from './components/CardPost.tsx';
import '../../All_posts.css';
import '../../App.css';
import axios from 'axios';
import Button_SignOut from '../Dashboard/components/Button_SignOut.tsx';

interface Post {
    id: number; // Definindo o tipo para os posts, um modelo
    cover: string;
    title: string;
    content: string;
    created_at: string;
}

const AllPosts: React.FC<{isDashboard?: boolean} > = ({isDashboard = false}) => {
    const [posts, setPosts] = useState<Post[]>([]); // Define o estado como um array de Post
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Define o tipo do erro

    useEffect(() => {
        const getData = async () => {
            try {
                // const data = await fetchPosts(); // Chama a função para buscar os dados
                axios.get('https://music-archive-epi.onrender.com').then(response => {
                    setPosts(response.data);   
                    console.log(response.data)                // Atualiza o estado com os dados

                })
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido'); // Verifica se é um erro
            } finally {
                setLoading(false);                 // Indica que o carregamento foi concluído
            }
        };

        getData();
    }, []);


    if (error) {
        return <p>{error}</p>;
    }

    if (loading){
        return <p>Carregando publicações</p>
    }

    return (
        <div className='container all-posts'>
            <div className='container_header'>
                <h2>Todos as publicações</h2>
                {isDashboard && <Button_SignOut/>}
            </div>
            {loading && <p>Carregando publicações...</p>}
            {/* div que guarda de fato todos os posts */}
            <div className='card-container'>
                {posts.map((post) => (
                    <CardPost key={post.id}
                        post = {post}
                        isDashboard = {isDashboard}
                    />
                ))}
            </div>
            
        </div>
    );
};


export default AllPosts;
