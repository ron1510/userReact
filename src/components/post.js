import '../index.css'


function PostComp({post}) {
    return (
        <div className="black-border margin-top">
            Title: {post.title} <br/>
            Body: {post.body}
        </div>
    );
}

export default PostComp;