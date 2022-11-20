import PostComp from "./post";


function PostsComp({ selectedIdPosts }) {

    return (
        <div className="App">
            {
                selectedIdPosts.map(post => {
                    return (
                        <div key = {post.id}>
                            <PostComp post={post} />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default PostsComp;
