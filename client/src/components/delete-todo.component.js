import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteTodo extends Component {
    componentDidMount() {
        axios.delete(`http://localhost:4000/todos/clear-completed`)
            .then(res => {
                console.log(res.data);
                // Refresh the page after deleting completed tasks
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                {/* Optionally, you can display a message or spinner while the deletion is in progress */}
                Deleting completed tasks...
            </div>
        )
    }
}
