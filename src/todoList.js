import './todo.css';
import { useState, useEffect } from 'react';
import { fetchTodos, addTodo, completeTodo, fetchCompletedTodos } from './api/todoApi';

function InputBar({ onAdd, isLoading }) {
    const [newItem, setNewItem] = useState('');

    const handleClick = async () => {
        if (newItem.trim()) {
            await onAdd(newItem);
            setNewItem('');
        }
    }

    return(
        <div className="header">
            <input type="text" 
                value={newItem}
                id="inputText" 
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="请输入内容"
                disabled={isLoading} />
            <button 
                id="confirmButton" 
                onClick={handleClick}
                disabled={isLoading}>
                {isLoading ? '添加中...' : '确认'}
            </button>
        </div>
    )
}

function TodoContainer({items = [], undo=true, onFinish, isLoading}){
    let title = undo? '待办事项' : '已做事项';
    let finishFunc = onFinish ? onFinish: function(){}

    if (isLoading) {
        return (
            <div className='todo-container'>
                <h2>{title}</h2>
                <div className='loading'>加载中...</div>
            </div>
        );
    }

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
    const [todoItems, setTodoItems] = useState([]);
    const [doneItems, setDoneItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // 初始加载数据
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const [todos, completedTodos] = await Promise.all([
                    fetchTodos(),
                    fetchCompletedTodos()
                ]);
                setTodoItems(todos);
                setDoneItems(completedTodos);
            } catch (err) {
                setError(err.message);
                console.error('Failed to load todos:', err);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadData();
    }, []);

    const addTodoItem = async (text) => {
        setIsLoading(true);
        try {
            const newItem = await addTodo(text);
            setTodoItems([...todoItems, newItem]);
        } catch (err) {
            setError(err.message);
            console.error('Failed to add todo:', err);
        } finally {
            setIsLoading(false);
        }
    }

    const finishItem = async (id, text) => {
        setIsLoading(true);
        try {
            const completedTodo = await completeTodo(id);
            setTodoItems(todoItems.filter(item => item.id !== id));
            setDoneItems([...doneItems, completedTodo]);
        } catch (err) {
            setError(err.message);
            console.error('Failed to complete todo:', err);
        } finally {
            setIsLoading(false);
        }
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className='todo-page'>
            <InputBar onAdd={addTodoItem} isLoading={isLoading} />
            <div className="content-container">
                <TodoContainer 
                    items={todoItems} 
                    undo={true} 
                    onFinish={finishItem}
                    isLoading={isLoading} 
                />
                <TodoContainer 
                    items={doneItems} 
                    undo={false}
                    isLoading={isLoading} 
                />
            </div>
        </div>
    )
}

export default TodoList;