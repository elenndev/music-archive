import React from "react";
import getDate from "../../../blog_configs"
import Button_PostReadMore from "../../../components/Button_PostReadMore";
import Content_Post from "../../../components/Content_Post";
import Title_Post from "../../../components/Title_Post";
import Button_PostDelete from "../../Dashboard/components/Button_PostDelete";
interface Post{
    id: number; // Definindo o tipo para os posts, um modelo
    cover: string;
    title: string;
    content: string;
    created_at: string;
}



const CardPost: React.FC<{ post: Post }> = ({ post }) => {
    const date = getDate(post.created_at)

    return(
        <div key={post.id} className='post-card'>
            <p className='post-card_date'>{date.dateMonth} | {date.dateDay}</p>
            <span>
                <Title_Post title={post.title}/>
                <img src={post.cover}></img>
                <Content_Post content={post.content} />
                <Button_PostReadMore id={post.id}/>
                <Button_PostDelete id={post.id}/>
            </span>
        </div>
    )
}


// export default ReadMore
export default CardPost