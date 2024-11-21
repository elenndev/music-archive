import { createElement } from "react"

function EditPost(id,cover,title,content,cover_description){
    const editor = document.querySelector('.ql-editor')
    let input_cover = document.querySelector('#cover')
    let input_coverDescription = document.querySelector('#cover_description')
    let h1 = document.createElement('h1')
    h1.textContent = title
    let post_title = h1.outerHTML

    editor.innerHTML = post_title + content
    input_cover.value = cover
    input_coverDescription.value = cover_description

    return(id)
}

export default EditPost