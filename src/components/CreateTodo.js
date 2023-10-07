import { useState } from "react"

const CreateTodo = ({ handleSubmit,loading }) => {
    const [task, setTask] = useState(null)

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e,task)}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <input onChange={(e) => setTask(e.target.value)} type="text" placeholder="enter title todo ..." className="form-control" />
                        {task ? '' : <div className="form-text text-danger">fill the title...</div>}
                    </div>
                    <div className="col-md-auto">

                        <button className="btn btn-dark">
                            {loading && <div className="spinner-border spinner-border-sm "></div>}Create Todo
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}
export default CreateTodo