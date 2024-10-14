import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './styles.module.css'

function Editor() {
    const [value, setValue] = useState('');

    return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}

export default Editor