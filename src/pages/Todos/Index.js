import { useState, useEffect } from "react"
import axios from "axios"

const IndexTodods = () => {
    const [todos, setTodos] = useState(null)
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
                    setError(null)
                })
                .catch(err => {
                    setLoading(false)

                    setError(err.message)
                })
        }
        fetchData()

    }, [])

    return (
        <>
            <h1 ><i className="bi bi-check2-circle"></i> <span>Todos : </span></h1>
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


            ))

            }
        </>
    )
}
export default IndexTodods
