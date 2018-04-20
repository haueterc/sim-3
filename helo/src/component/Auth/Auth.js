import React, { Component } from 'react';
import './Auth.css';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state={
            username: '',
            password: ''
        }
        this.updatePassword = this.updatePassword.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
    }

    updatePassword(password) {
        this.setState({
            password
        })
    }

    updateUsername(username) {
        this.setState({
            username
        })
    }

    render() {
        const { username, password } = this.state;
        return (
            <div>
                <div>Auth</div>
                <input 
                    type="text"
                    defaultValue="username"
                    value={ username }
                    onChange={ (e) => this.updateUsername(e.target.value)}
                    />
                <input 
                    type="text"
                    defaultValue="password"
                    value={ password }
                    onChange={(e) => this.updatePassword(e.target.value)}
                    />
                <button>Login</button>
                <button>Register</button>
            </div>
        )
    }
}

export default Auth