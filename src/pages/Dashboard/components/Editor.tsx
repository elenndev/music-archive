import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.bubble.css';
import './static/styles.module.css'

function Editor() {
    const [value, setValue] = useState('');

    const modules = {
        toolbar: [
            [{header: [1, 2, false]}],
            ['bold', 'italic', 'underline'],
            [{list: 'ordered'}, {list: 'bullet'}],
            ['link', 'image']
        ]
    }

    return <ReactQuill modules={modules} theme="bubble" value={value} onChange={setValue} />;
}

export default Editor