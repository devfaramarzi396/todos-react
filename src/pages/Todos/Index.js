import { useState, useEffect } from "react"
import axios from "axios"

const IndexTodods = () => {
    const [todos, setTodos] = useState(null)
    const [todosLen, setTodosLen] = useState(null)
    const [count, setFilterTodos] = useState(200)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        async function fetchData() {
            await axios.get("https://jsonplaceholder.typicode.com/todos")
                .then(res => {
                    console.log(res.data);
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

    const filterCountTodos = (e) => {
        setFilterTodos(e.target.value)
    }


    return (
        <>
            <h3 style={{ marginTop: '11px' }}><i className="bi bi-check2-circle"></i> <span> Todos : <span style={{ fontSize: '18px', color: 'green' }}>{todosLen} tasks</span> </span></h3>
            <div className="row mb-3">
                <div className="col-md-2">
                    <span style={{ color: 'blue' }} >show count todos :</span>
                    <select onChange={(e) => filterCountTodos(e)} style={{ minWidth: '100%' }}>
                        <option value="200">All</option>
                        <option value="3">3</option>
                        <option value="7">7</option>
                        <option value="11">11</option>
                        <option value="33">33</option>
                        <option value="111">111</option>

                    </select>
                </div>

            </div>
            {loading && <div className="spinner-border"></div>}
            {error && <p>{error}</p>}
            {todos && todos.map(todo => (

                <div className="col-md-4 mb-3">
                    <div className={"card " + (todo.completed && "bg-success")} key={todo.id}>
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div>
                                {todo.completed ? <del> {todo.title.substring(0, 33)}</del> : <span> {todo.title.substring(0, 33)}</span>}
                            </div>
                            <div className="todo-icons">
                                {todo.completed ? <i class="bi bi-check2-all"></i> : <i class="bi bi-check2"></i>}


                                <i className="bi bi-trash-fill"></i>
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
