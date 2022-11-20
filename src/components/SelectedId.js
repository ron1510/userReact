import PostsComp from "./Posts";
import TodosComp from "./Todos";
import "../index.css"
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import {completedAllTodos, updateItem} from "../utils"
import AddPostComp from "./AddPost";
import AddTodoComp from "./AddTodo";

function SelectedIdComp({ getPostsById, getTodosById, selectedId, setTodos, setPosts, todos, posts,setBorderColors,borderColors}) {

    const [postsById, setPostsById] = useState(getPostsById(selectedId))
    const [todosById, setTodosById] = useState(getTodosById(selectedId))

    const [addPost, setAddPost] = useState(false);
    const [addTodo, setAddTodo] = useState(false);

    const [borderColor, setBorderColor] = useState("red")

    useEffect(() => {
        setPostsById(getPostsById(selectedId))
        setTodosById(getTodosById(selectedId))
    },[selectedId])
    
    useEffect(() => {
        completedAllTodos(todosById) ? setBorderColor({id: selectedId, color: "green"}) : setBorderColor({id: selectedId, color: "red"})
    }, [todosById, todos])

    useEffect(() => {
        setBorderColors(updateItem(borderColors, borderColor))
    }, [borderColor])
    
    const addNewTodo = (title, userId) => {
        let newTodo = {
            userId: userId,
            id: (todos[todos.length-1].id)+1,
            title: title,
            completed: false
        }
        setTodos([...todos, ...[newTodo]])
        setTodosById([...todosById, ...[newTodo]])
    }

    const addNewPost = (title, userId, body) => {
        let newPost = {
            userId: userId,
            id: (posts[posts.length-1].id)+1,
            title: title,
            body: body
        }
        setPosts([...posts, ...[newPost]])
        setPostsById([...postsById,...[newPost]])
    }

    return (
        <div className="App">
            {!Boolean(addTodo) ?
                (
                    <>
                        <span className = "text-left">Todos - User {selectedId}</span>
                        <Button className = "text-right" onClick = {()=>{setAddTodo(true)}} variant="success">Add</Button>
                        <br />
                        <TodosComp selectedIdTodos={todosById} setTodos={setTodos} todos={todos} />
                    </>
                )
                :
                (
                    <AddTodoComp userId={selectedId} setAddTodo={setAddTodo} addNewTodo={addNewTodo}/>
                )
            }
            {!Boolean(addPost) ?
                (
                    <>
                        <span className = "text-left">Posts - User {selectedId}</span>
                        <Button className = "text-right" onClick = {()=>{setAddPost(true)}} variant="success">Add</Button>
                        <br />
                        <PostsComp selectedIdPosts={postsById} setPosts={ setPosts} />
                    </>
                )
                :
                (
                    <AddPostComp userId={selectedId} setAddPost={setAddPost} addNewPost={addNewPost} />
                )
            }



        </div>
    );
}

export default SelectedIdComp;
