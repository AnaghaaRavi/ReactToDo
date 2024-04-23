import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = ({ todo, onDelete }) => (
    <tr>
        <td className={todo.todo_completed ? 'completed' : ''}>{todo.todo_description}</td>
        <td className={todo.todo_completed ? 'completed' : ''}>{todo.todo_responsible}</td>
        <td className={todo.todo_completed ? 'completed' : ''}>{todo.todo_priority}</td>
        <td>
            <Link to={`/edit/${todo._id}`}>Edit</Link>
            {/* Add delete button */}
            <button onClick={() => onDelete(todo._id)}>Delete</button>
        </td>
    </tr>
);

class TodosList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
    }

    componentDidMount() {
        this.fetchTodos();
    }

    fetchTodos = () => {
        axios.get('http://localhost:4000/todos')
            .then(res => {
                this.setState({
                    todos: res.data
                });
            })
            .catch(err => console.log(err));
    }

    deleteTodo = (id) => {
        axios.delete(`http://localhost:4000/todos/${id}`)
            .then(res => {
                console.log(res.data);
                // After deleting, fetch updated todos
                this.fetchTodos();
            })
            .catch(err => console.log(err));
    }

    todoList = () => this.state.todos.map((todo, index) => (
        <Todo todo={todo} key={index} onDelete={this.deleteTodo} />
    ));

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TodosList;
