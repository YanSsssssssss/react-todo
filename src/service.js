const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

app.use(cors({
  origin: function (ctx) {
    // 允许所有来源访问
    if (ctx.url === '/api/todos') {
      return '*'; // 允许来自所有域名的请求
    }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// 模拟的待办事项数据存储
let todos = [
  { id: 1, text: '学习 Koa', completed: false },
  { id: 2, text: '完成项目', completed: false },
];

router.get('/api/todos', async (ctx) => {

  ctx.body = todos;
});

router.post('/api/todos', async (ctx) => {
  const { text } = ctx.request.body;
  const newTodo = {
    id: todos.length + 1,
    text,
    completed: false,
  };
  todos.push(newTodo);
  ctx.status = 201;
  ctx.body = newTodo;
});

router.put('/api/todos/:id/complete', async (ctx) => {
  const { id } = ctx.params;
  const todo = todos.find((t) => t.id == id);
  if (todo) {
    todo.completed = true;
    ctx.body = todo;
  } else {
    ctx.status = 404;
    ctx.body = { error: '待办事项未找到' };
  }
});

router.get('/api/todos/completed', async (ctx) => {
  const completedTodos = todos.filter((t) => t.completed);
  ctx.body = completedTodos;
});

// 使用路由中间件
app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});