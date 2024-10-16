import { useEffect, useState } from "react";
import getDate from "../../../blog_configs";
import axios from 'axios'
import Content_Post from "../../../components/Content_Post";
import Button_PostReadMore from "../../../components/Button_PostReadMore";
// import DOMPurify from "dompurify";

interface Post {
    id: number; // Definindo o tipo para os posts, um modelo
    cover: string;
    title: string;
    content: string;
    created_at: string;
}

const Post: React.FC<{ post: Post }> = ({ post }) => {
    const date = getDate(post.created_at)
    // const contentString = post.content
    // const content = DOMPurify.sanitize(contentString)

    return(
        <div className="post">
            <div className="post_info">
                <p className="post_info_date">{date.dateMonth} | {date.dateDay}</p>
                <h2>{post.title}</h2>
            </div>
            <img src={post.cover}></img>
            {/* <div className="post_content" dangerouslySetInnerHTML={{__html: content}}></div> */}
            <Content_Post content={post.content} />
            <Button_PostReadMore id={post.id} />
        </div>
    )
}

const LatestPosts = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const getData = async () => {
            try{
                // const data = await fetchPosts()
                axios.get('https://music-archive-epi.onrender.com').then(response => {
                    setPosts(response.data)
                    console.log(response.data)
                    
                })
            } catch(err) {
                setError(err instanceof Error ? err.message : 'Erro')
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [])

    if (error) {
        return(error)
    }

    return(
        <>
            <section className="container latest-posts">
                <div className="container_header"><h2>Últimas publicações</h2></div>
                {loading && <p>Carregando publicações...</p>}
                {posts.map((post)=>(
                    <Post key={post.id} post = {post}/>
                ))}
            </section>
        </>
    )
}

export default LatestPosts