/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import { UserContext } from "../UserContext";

import { Simplesharer } from "simple-sharer";


export const PostPage = () => {
    const [postInfo, setPostInfo] = useState(null)

    const { userInfo } = useContext(UserContext);
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!postInfo) return '';

    const sh = new Simplesharer();
    sh.url = `http://localhost:3000/post/${id}`; //your url


    return (
        <div className="post-page-container">
            <div className="post-page-div">

                <div className="post-page-logo">
                    <Link onClick={() => {
                        sh.copy()
                        alert('URL Copied to Clipboard')
                    }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="copy-to-clipboard"><path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z" /></svg>
                    </Link>


                    {userInfo.id === postInfo.author._id &&
                        <div className="post-page-edit-btn">
                            <Link to={`/edit/${postInfo._id}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="edit-pen"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg></Link>
                        </div>}
                </div>


                <div className="post-page-image">
                    <img src={`http://localhost:4000/${postInfo.cover}`} />
                </div>
                <h1 className="post-page-heading">{postInfo.title}</h1>
                <div className="post-page-info">
                    <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
                    <a>by @{postInfo.author.username}</a>
                </div>



                <div dangerouslySetInnerHTML={{ __html: postInfo.content }} className='post-page-content' />




            </div>
        </div>
    )
}

export default PostPage