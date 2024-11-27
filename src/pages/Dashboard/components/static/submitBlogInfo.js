import axios from "axios";
import { checkAuth } from "../../../../middleware";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function submitBlogInfo(type,event, info_data){
    if (event != null){
        event.preventDefault()
    }
    
    let input = document.querySelector('div.featured-playlist>form>input').value
    const embed_link = 'https://open.spotify.com/embed/playlist/'
    const playlist = embed_link + input.split('playlist/')[1]
    
    const submit = async() =>{
        const auth = await checkAuth()
        if (auth.data.status_code !== 200){
            window.alert(`token inválido | status: ${auth.status} | ${auth.data.detail}`)
            return window.location.href = '/blog-login'
        } else {
            if (type== "featured playlist"){
                const data = {
                    "info_name": "featured_playlist",
                    "text_value": playlist
                }
                const response = await axios.put(`${SERVER_URL}/set-fast-infos`, data)
                if (response.data){
                    document.querySelector('div.featured-playlist>form>input').value = ""
                    return true
                } else {
                    return false
            }}else if (type =="week album"){
                const data = {
                    "info_name": "week_album",
                    "text_value": info_data
                }
                const response = await axios.put(`${SERVER_URL}/set-fast-infos`, data)
            }
        }

    }
    
    submit()
}

export default submitBlogInfo
