import React from 'react'
import { RiCloseCircleLine } from "react-icons/ri"
import { BiCheckCircle } from "react-icons/bi"

export default function TodoItem( props) {
    
    const { todo, removeTodo, importantTodo } = props
    return (
        <div className={todo.completed ? "todo-row complete" : "todo-row"} style={todo.important ? { background: "orange" } : {}}>
            {todo.id}    {todo.text} 
            <div className="iconsContainer">
                <BiCheckCircle style={{ marginRight: 5 }} onClick={() => importantTodo(todo.id)} className="important-btn"/>
                <RiCloseCircleLine style={{ marginRight: 5 }} onClick={() => removeTodo(todo.id)}/>
            </div>
        </div>
    )
}
