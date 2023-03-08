import Post from "../Post"
import { useEffect, useState } from "react"

export const IndexPage = () =>  {
    const [posts, setPosts] = useState([])


    useEffect(() => {
        fetch('https://mern-blog-backend-drtw.onrender.com/post').then(response => {
            response.json().then(posts => {
                setPosts(posts)
            })
        })
    }, [])
    return (

        
        <div className="all-posts-container">
        {posts.length > 0 && posts.map(post => (<Post {...post} />))}
        </div>
    )
}

export default IndexPage