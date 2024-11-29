import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.bubble.css';
import './static/styles.module.css'

function Editor() {
    const [value, setValue] = useState('');

    return <ReactQuill theme="bubble" value={value} onChange={setValue} />;
}

export default Editor