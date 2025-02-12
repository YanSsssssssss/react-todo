import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === '123') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/todos');
    } else {
      alert('用户名或密码错误');
    }
  };

  return (
    <div>
      <h1>登录页面</h1>
      <div>
        <label>用户名：</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>密码：</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>登录</button>
      <Link to="/todos">跳转到 Todo List</Link>
    </div>
  );
};

export default Login;