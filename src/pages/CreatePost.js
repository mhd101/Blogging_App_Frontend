
import ReactQuill from 'react-quill'
import { useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom';


const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image'],
        ['clean'],
    ],
};


export const CreatePost = () => {

    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const [redirect, setRedirect] = useState(false)

    const handleSubmit = async (e) => {

        const data = new FormData();
        data.set('title', title)
        data.set('summary', summary)
        data.set('file', files[0])
        data.set('content', content)
        e.preventDefault();

        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        })
        if (response.ok) {
            setRedirect(true)
        } else {
            alert('All Fields are required!!')
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <form onSubmit={handleSubmit}className='create-post-container'>
            <input type='title'
                placeholder="Enter Title"
                value={title}
                onChange={e => setTitle(e.target.value)} />
            <input type='summary'
                placeholder="Enter Blog Summary"
                value={summary}
                onChange={e => setSummary(e.target.value)} />

            <input type='file'
                className='select'
                placeholder="Select Thumbnail"
                onChange={e => setFiles(e.target.files)} />
            <ReactQuill value={content}
                className='quill'
                onChange={newValue => setContent(newValue)}
                modules={modules}
                theme={'snow'}
                placeholder="Write your blog here" />
            <button className='create-post-btn'>Create Post</button>
        </form>
    )
}

export default CreatePost;