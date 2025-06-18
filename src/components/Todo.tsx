import type { TodoItemTypes } from "../pages/TodoPage"
import CheckIcon from "./CheckIcon"

interface PropTypes {
    todos: TodoItemTypes[]
    editTodo: (id: string, value: string) => void
    deleteTodo: (id: string) => void
    todoCompleted: (id: string, isCompleted: boolean) => void
}
const size = 'size-6'
const color = 'text-green-800'
const Todo = ({ todos, editTodo, deleteTodo, todoCompleted }: PropTypes) => {
    return (
        <>
            {
                todos && todos.map(item => {
                    return (
                        <li key={item.id} className={`bg-blue-100 p-3 flex justify-between mb-2 rounded-md ${item.isCompleted ? 'bg-green-200' : 'bg-blue-100'} ${item.isEditing && 'bg-gray-100'}`}>
                            <div>{item.isCompleted ? <span className="text-2xl">👌</span> : <span className="text-2xl">👍</span>} {item.value}</div>
                            <div className="flex items-center">
                                {item.isCompleted ? <CheckIcon size={size} color={color} /> : ""}
                                <button className="btn-sm ml-2" onClick={() => todoCompleted(item.id, item.isCompleted)}>
                                    {item.isCompleted ? 'Continue Task ?' : 'Task Completed !'} </button>
                                <button className="btn-sm ml-2" onClick={() => editTodo(item.id, item.value)}>Edit</button>
                                <button className="btn-sm ml-2" onClick={() => deleteTodo(item.id)}>Delete</button>
                            </div>
                        </li>
                    )
                })
            }
        </>
    )
}

export default Todo
