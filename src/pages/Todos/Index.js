import { useState, useEffect } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import FilterCountTodos from "../../components/FilterCountTodo"
import FilterKindTodos from "../../components/FilterKindTodo"
import CreateTodo from "../../components/CreateTodo"

const IndexTodods = () => {
    const [todos, setTodos] = useState(null)
    const [todosLen, setTodosLen] = useState(null)
    const [count, setCountTodos] = useState(200)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
  

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
    const handleSubmit = (e,task) => {
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
           
           
            <CreateTodo handleSubmit={handleSubmit}  loading={loading}/>
          


            <div className="row mb-3">
                <div className="col-md-2">
                    <FilterCountTodos handleCountTodos={handleCountTodos} />

                </div>
                {/* -=-=-=- */}
                <div className="col-md-2">
                    <FilterKindTodos handleKindTodos={handleKindTodos} />

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
