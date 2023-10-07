import { useState, useEffect } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import FilterCountTodos from "../../components/FilterCountTodo"
import FilterKindTodos from "../../components/FilterKindTodo"

const IndexTodods = () => {
    const [todos, setTodos] = useState(null)
    const [todosLen, setTodosLen] = useState(null)
    const [count, setCountTodos] = useState(200)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [task, setTask] = useState(null)

    useEffect(() => {
        setLoading(true)
        async function fetchData() {
            await axios.get("https://jsonplaceholder.typicode.com/todos")
                .then(res => {
                    setLoading(false)
                    setTodos(res.data)
                    setTodosLen(res.data.length)
                    setError(null)
                })
                .catch(err => {
                    setLoading(false)

                    setError(err.message)
                })
        }
        fetchData()

    }, []);

    const handleCountTodos = (e) => {
        setCountTodos(e.target.value)
    }
    const handleKindTodos = (e) => {
        let url = ''

        if (e.target.value === 'all') {
            url = "https://jsonplaceholder.typicode.com/todos"
        } else if (e.target.value === 'checked') {
            url = "https://jsonplaceholder.typicode.com/todos?completed=true"
        } else {
            url = "https://jsonplaceholder.typicode.com/todos?completed=false"

        }

        setLoading(true)
        async function fetchData() {
            await axios.get(url)
                .then(res => {
                    setLoading(false)
                    setTodos(res.data)
                    setError(null)


                })
                .catch(err => {
                    setLoading(false)

                    setError(err.message)
                })
        }
        fetchData()

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        if (task) {

            async function sendData() {
                await axios.post(`https://jsonplaceholder.typicode.com/todos`, { title: task, completed: false, userId: 1 })
                    .then(res => {
                        setLoading(false)

                        // console.log('response', res.data)
                        const newToto = res.data
                        setTodos([newToto, ...todos])

                        Swal.fire({
                            title: "Task added",
                            icon: "success",
                            showConfirmButton: false,
                            timerProgressBar: true,
                            timer: 3000,
                            toast: true,
                            position: 'top',
                        });

                    })
                    .catch(err => {
                        setLoading(false)
                        setError(err.message)
                        Swal.fire(
                            'Uooops!',
                            err.message,
                            'warning'
                        )
                    })
            }
            sendData()
        }
        else {
            setLoading(false)
        }
    }

    const changeTodoStatus = (todoId, todoCompleted) => {
        setLoading(true)

        async function todoUpdate(id, completed) {
            await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, { id: id, completed: !completed })
                .then(res => {
                    console.log(res.data);
                    setLoading(false)
                    setTodos(todos.map(todo => (
                        todo.id === id ? { ...todo, completed: !completed } : todo
                    )))
                    Swal.fire({
                        title: "Task updated ...",
                        icon: "success",
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 3000,
                        toast: true,
                        position: 'top',
                    });
                })
                .catch(err => {
                    setLoading(false)
                    setError(err.message)
                    Swal.fire(
                        'Uooops!',
                        err.message,
                        'warning'
                    )
                })
        }
        todoUpdate(todoId, todoCompleted)
    }

    const handleDeleteTodo = (todoId) => {
        setLoading(true)

        async function deleteTodo(id) {
            await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
                .then(res => {
                    setLoading(false)
                    setTodos(todos.filter(todo => todo.id !== id))
                    Swal.fire({
                        title: "Task deleted ...",
                        icon: "success",
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 3000,
                        toast: true,
                        position: 'top',
                    });
                })
                .catch(err => {
                    setLoading(false)
                    setError(err.message)
                    Swal.fire(
                        'Uooops!',
                        err.message,
                        'warning'
                    )
                })
        }
        deleteTodo(todoId)
    }
    return (
        <>
            <h3 style={{ marginTop: '11px' }}><i className="bi bi-check2-circle"></i> <span> Todos : <span style={{ fontSize: '18px', color: 'green' }}>{todosLen} tasks</span> </span></h3>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <input onChange={(e) => setTask(e.target.value)} type="text" placeholder="title todo .." className="form-control" />
                        {task ? '' : <div className="form-text text-danger">fill the title...</div>}
                    </div>
                    <div className="col-md-auto">

                        <button className="btn btn-dark">{loading && <div className="spinner-border spinner-border-sm "></div>}Create Todo</button>
                    </div>
                </div>
            </form>


            <div className="row mb-3">
                <div className="col-md-2">
                    <FilterCountTodos handleCountTodos={handleCountTodos} />
                    {/* <span style={{ color: 'blue' }} >show count todos :</span>
                    <select onChange={(e) => filterCountTodos(e)} style={{ minWidth: '100%' }}>
                        <option value="200">All</option>
                        <option value="3">3</option>
                        <option value="7">7</option>
                        <option value="11">11</option>
                        <option value="33">33</option>
                        <option value="111">111</option>

                    </select> */}
                </div>
                {/* -=-=-=- */}
                <div className="col-md-2">
                    <FilterKindTodos handleKindTodos={handleKindTodos} />
                    {/* <span style={{ color: 'blue' }} >show kind todos :</span>
                    <select onChange={(e) => handleKindTodos(e)} style={{ minWidth: '100%' }}>
                        <option value="all">All</option>
                        <option value="checked">Checked Todos</option>
                        <option value="Remaning">Remaning Todos</option>

                    </select> */}
                </div>

            </div>
            <div className="row">
                <div className="col-md-12">
                    {loading && <div className="spinner-border"></div>}
                </div>
            </div>
            {error && <p>{error}</p>}
            {
                todos && todos.map(todo => (

                    <div className="col-md-4 mb-3" key={todo.id}>

                        <div className={"card " + (todo.completed && "bg-success")} >
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    {todo.completed ? <del> {todo.title.substring(0, 33)}</del> : <span> {todo.title.substring(0, 33)}</span>}
                                </div>

                                <div className="todo-icons">

                                    {todo.completed ?

                                        <i className="bi bi-check2-all" onClick={(e) => changeTodoStatus(todo.id, todo.completed)}></i> :
                                        <i className="bi bi-check2" onClick={(e) => changeTodoStatus(todo.id, todo.completed)} ></i>
                                    }


                                    <i className="bi bi-trash-fill" onClick={(e) => handleDeleteTodo(todo.id)}></i>
                                </div>
                            </div>
                        </div>
                    </div>


                )).slice(0, count)

            }
        </>
    )
}
export default IndexTodods
