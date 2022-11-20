import TodoComp from "./Todo";


function TodosComp({selectedIdTodos,setTodos, todos}) {
    return (
        <div className="App">
            {
                selectedIdTodos.map(todo => {
                    return (
                        <div key = {todo.id}>
                            <TodoComp todo={todo} setTodos={setTodos} todos={todos} />
                        </div>
                    )

                })
                
            }
        </div>
    );
}

export default TodosComp;