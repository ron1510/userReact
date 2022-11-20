import SearchBarComp from './SearchBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserDetailsComp from './UserDetails';
import AddUserComp from './AddUser';
import { useState, useEffect } from 'react';
import { getAll, checkSubstringInUser, deleteItem, updateItem,deleteByUserId,getNextId} from "../utils"
import SelectedIdComp from './SelectedId';



const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts';


function MainCompComp() {

    const [addUser,setAddUser] = useState(false)

    const [users, setUsers] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [fetchedUsers, setFetchedUsers] = useState(false)

    const [todos, setTodos] = useState([])
    const [fetchedTodos, setFetchedTodos] = useState(false)
    const [borderColors, setBorderColors] = useState([])
    const [start,setStart] = useState("1")
    

    const [posts, setPosts] = useState([])
    const [fetchedPosts, setFetchedPosts] = useState(false)

    const [selectedId, setSelectedId] = useState("")
    
    const [searchBarContent, setSearchBarContent] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const { data: usersData } = await getAll(usersUrl)
            setUsers(usersData)
            setAllUsers(usersData)
            setFetchedUsers(true)
            const { data: postsData } = await getAll(postsUrl)
            setPosts(postsData)
            setFetchedPosts(true)
            const { data: todosData } = await getAll(todosUrl)
            setTodos(todosData)
            setFetchedTodos(true)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (users.length > 0 && start === "1") {
            let tmp = []
            users.map(user => {
                tmp.push({ id: user.id, color: "red" })
                return user
            })
            setBorderColors(tmp)
            setStart("2")
        }

    },[users])
    
    useEffect(() => {
        const newUsers = []
        let newSelectedId = ""
        allUsers.map(user => {
            if (checkSubstringInUser(searchBarContent, user)) {
                newUsers.push(user)
                if (user.id === selectedId) {
                    newSelectedId = user.id
                }
            }
            return user
        })
        setSelectedId(newSelectedId)
        setUsers(newUsers)
    }, [searchBarContent, allUsers])


    const updateUser = (user) => {
        setUsers(updateItem(users, user))
        setAllUsers(updateItem(allUsers, user))
    }
    
    const deleteUser = (user) => {
        setUsers(deleteItem(users, user))
        setAllUsers(deleteItem(allUsers, user))
        setBorderColors(deleteItem(borderColors,user))
        setTodos(deleteByUserId(todos, user.id))
        setPosts(deleteByUserId(posts, user.id))
        if (user.id === selectedId) {
            setSelectedId("")
        }
    }

    const addNewUser = (name,email) => {
        let newUser = {
            id: getNextId(allUsers),
            name: name,
            username: "",
            email: email,
            address: {
                street: "",
                suite: "",
                city: "",
                zipcode: "",
                geo: {
                    lat: "",
                    lng: ""
                }
            },
            phone: "",
            website: "",
            company: {
                name: "",
                catchPhrase: "",
                bs: ""
            }
        }
        setBorderColors([...borderColors,...[{id: newUser.id, color: "green"}]])
        setAllUsers([...allUsers, ...[newUser]])
        if (checkSubstringInUser(searchBarContent, newUser)) {
            setUsers([...users,...[newUser]])
        }
    }

    const getById = (id, items) => {
        let result = []
        items.map(item => {
            if (item.userId === id) {
                result.push(item)
            }
            return item
        })
        return result
    }

    const getTodosById = (id) => {
        return getById(id,todos)
    }

    const getBorderColorById = (id) => {
        let result = ""
        
        borderColors.map(color => {
            if (color.id === id) {
                result = color
            }
            return color
        })
        return result;
    }

    const getPostsById = (id) => {
        return getById(id,posts)
    }

    return (
        <div className="">
            <Container>
                <Row>
                    <Col>
                        <SearchBarComp setSearchBarContent={setSearchBarContent} setAddUser = {setAddUser} />
                    </Col>
                </Row>
                    <Row>
                    <Col>
                        {Boolean(fetchedPosts) && Boolean(fetchedTodos) && Boolean(fetchedUsers)
                            ?
                                (
                                users.map(user => {
                                        const bColor = getBorderColorById(user.id)
                                        return (
                                                <div key = {user?.id}>
                                                <UserDetailsComp curUser={user} setSelectedId={setSelectedId} updateUser={updateUser} deleteUser={deleteUser} bColor = {bColor} />
                                                </div>
                                            )
                                        })
                                )
                            :
                                (
                                    null
                                )
                        }

                        </Col>
                        {Boolean(addUser) ?
                            (<Col>
                            <AddUserComp setAddUser={setAddUser} addNewUser={addNewUser} />
                            </Col>)
                        :
                        (
                            null
                        )
                        }
                    
                        {selectedId && !(Boolean(addUser))?
                            (
                                <Col>
                                    <SelectedIdComp getPostsById={getPostsById} getTodosById={getTodosById} selectedId={selectedId} setTodos={setTodos} setPosts={setPosts} todos={todos} posts = {posts} setBorderColors={setBorderColors} borderColors={borderColors}/>
                                </Col>
                            )
                        : (null)
                        }
                    </Row>
                </Container>
        </div>
    );
}

export default MainCompComp;