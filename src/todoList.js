import './todo.css';
import { useState } from 'react';

function InputBar(add) {
    let onAdd = add.onAdd;
    const [newItem, setNewItem] = useState('');

    const handleClick = ()=> {
        if (newItem.trim()) {
            onAdd(newItem);
            setNewItem('');
        }
    }

    return(
        <div className="header">
            <input type="text" 
                value={newItem}
            id="inputText" 
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="请输入内容" />
            <button id="confirmButton" onClick={handleClick}>确认</button>
        </div>
    )
}

function TodoContainer({items = [], undo=true, onFinish}){
    let title = undo? '待办事项' : '已做事项';
    let finishFunc = onFinish ? onFinish: function(){}

    return(
        <div className='todo-container'>
            <h2>{title}</h2>
            <div className='todo-list'>
                {items.map(item => (
                    <TodoItem
                        key={item.id}
                        id={item.id}
                        text={item.text}
                        showButton={undo}
                        onFinish={finishFunc}
                    />
                ))}
            </div>
        </div>
    )
}

function TodoItem({id, text, showButton, onFinish}) {
    return (
        <div className='todo-item'>
            <span>{text}</span>
            {showButton && <FinishButton onClick={() => { onFinish(id, text)}} />}
        </div>
    )
}

function FinishButton({onClick}) {
    return (
        <button className="finish-button" onClick={onClick}>完成</button>
    )
}

function TodoList() {
    const [todoItems, setTodoItems] = useState([])
    const [doneItems, setDoneItems] = useState([])

    const addTodoItem = function(text) {
        const newItem = {
            id: Date.now(),
            text,
        };
        setTodoItems([...todoItems, newItem]);
    }

    const finishItem = function (id, text) {
        setTodoItems(todoItems.filter(item => item.id !== id));

        setDoneItems([...doneItems, { id: Date.now(), text }])

    }

    return (
        <div className='todo-page'>
            <InputBar onAdd={addTodoItem} />
            <div className="content-container">
                <TodoContainer items={todoItems} undo={true} onFinish={finishItem} />
                <TodoContainer items={doneItems} undo={false} />
            </div>
        </div>
    )
}

export default TodoList;