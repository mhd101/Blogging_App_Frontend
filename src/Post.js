/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link } from 'react-router-dom'
import { formatISO9075 } from 'date-fns'


export const Post = ({ title, summary, cover, content, createdAt, author, _id }) => {
  return (
    <div className="index-post">
      <div className="index-post-image">
        <Link to={`/post/${_id}`}><img src={'https://mern-blog-backend-drtw.onrender.com/' + cover} alt="cover" /></Link>
      </div>
      <div className="index-post-heading">
        <Link to={`/post/${_id}`}><h2>{title}</h2></Link>
      </div>

      <p className="index-post-info">
        <a>Published By @{author.username}</a>
        <time>{formatISO9075(new Date(createdAt))}</time>
      </p>
      <div className='index-post-summary'>
        <p>{summary}</p>
      </div>
    </div>
  );

}

export default Post

