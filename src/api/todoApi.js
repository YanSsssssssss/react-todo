// 后端 API 的基础 URL
const BASE_URL = 'http://localhost:3001/api';

// 获取所有待办事项
export const fetchTodos = async () => {
    const response = await fetch(`${BASE_URL}/todos`);
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return response.json();
};

// 添加新的待办事项
export const addTodo = async (text) => {
    const response = await fetch(`${BASE_URL}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    });
    if (!response.ok) {
        throw new Error('Failed to add todo');
    }
    return response.json();
};

// 完成待办事项
export const completeTodo = async (id) => {
    const response = await fetch(`${BASE_URL}/todos/${id}/complete`, {
        method: 'PUT',
    });
    if (!response.ok) {
        throw new Error('Failed to complete todo');
    }
    return response.json();
};

// 获取已完成的事项
export const fetchCompletedTodos = async () => {
    const response = await fetch(`${BASE_URL}/todos/completed`);
    if (!response.ok) {
        throw new Error('Failed to fetch completed todos');
    }
    return response.json();
};
