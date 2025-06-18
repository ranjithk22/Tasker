import { useEffect, useReducer, useState } from "react"
import Todo from "../components/Todo"
import { v4 as uuidv4 } from 'uuid';

export interface TodoItemTypes {
    id: string,
    value: string,
    isCompleted: boolean
}
const TODOACTIONS = {
    ADD: 'add',
    EDIT: 'edit',
    DELETE: 'delete',
    COMPLETED: 'completed'
}
const TodoPage = () => {
    const [todo, setTodo] = useState<TodoItemTypes>({
        id: '',
        value: '',
        isCompleted: false
    })
    const [editStatus, setEditStatus] = useState<boolean>(false)

    const onTodoValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(prev => ({ ...prev, value: e.target.value }))
    }

    const onTodoSumbit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({
            type: TODOACTIONS.ADD, payload: {
                id: uuidv4(),
                value: todo.value,
                isCompleted: todo.isCompleted
            }
        })
        setTodo({ id: '', value: '', isCompleted: false })
    }
    const onEditTodoSumbit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({
            type: TODOACTIONS.EDIT, payload: {
                id: todo.id,
                value: todo.value,
                isCompleted: todo.isCompleted
            }
        })
        setTodo({ id: '', value: '', isCompleted: false })
        setEditStatus(prev => !prev)
    }
    const deleteTodo = (id: string) => {
        dispatch({
            type: TODOACTIONS.DELETE, payload: id
        })
    }
    const todoCompleted = (id: string, isCompleted: boolean) => {
        dispatch({
            type: TODOACTIONS.COMPLETED, payload: {
                id: id, isCompleted: isCompleted
            }
        })
    }
    const todoReducer = (state: TodoItemTypes[], action: any) => {
        switch (action.type) {
            case TODOACTIONS.ADD:
                return [...state, action.payload]
            case TODOACTIONS.EDIT:
                return state.map(item =>
                    item.id === action.payload.id
                        ? { ...item, value: action.payload.value }
                        : item
                )
            case TODOACTIONS.DELETE:
                return state.filter(item => item.id !== action.payload)
            case TODOACTIONS.COMPLETED:
                return state.map(item =>
                    item.id === action.payload.id
                        ? { ...item, isCompleted: !action.payload.isCompleted }
                        : item
                )
            default:
                return state
        }
    }
    const [todos, dispatch] = useReducer(todoReducer, [])

    const editTodo = (id: string) => {
        let [item] = todos.filter(item => item.id === id)
        if (item) {
            setEditStatus(true)
            setTodo({ id: item.id, value: item.value, isCompleted: item.isCompleted })
        }
    }
    useEffect(() => {
        console.log(todos)
    }, [todos])

    return (
        <div className="container my-[50px]">
            <div className="heading">Add Todo</div>
            <div className="border border-gray-200 p-3 my-3">

                <form action="" onSubmit={!editStatus ? onTodoSumbit : onEditTodoSumbit}>
                    <input className="border border-gray-400 mx-3 min-h-[40px] rounded px-2 focus:border focus:border-blue-600" placeholder="Enter Todo" type="text" value={todo.value} onChange={onTodoValueChange} required />
                    <button className="btn">{!editStatus ? 'Add Todo' : 'Update Todo'}</button>
                </form>

            </div>
            <div className="heading">Todo List</div>
            <div className="border border-gray-200 p-3 my-3">
                <ul>
                    {todos.length > 0 ? (
                        <Todo todos={todos} editTodo={editTodo} deleteTodo={deleteTodo} todoCompleted={todoCompleted} />
                    ) : (
                        <p>Todo List is empty <span className="text-2xl">😁</span>, add todo! <span className="text-2xl">😊</span></p>
                    )}
                </ul>
            </div>
        </div >
    )
}

export default TodoPage
