import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../Styles/Card.css';
import PostList from './PostList';

const Login = () => {
    //store username
    const [username, setUsername] = useState('');
    //store password
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {
                const User = users.find(user => user.email === username);
                if (User) {
                    setIsLoggedIn(true);
                    sessionStorage.setItem('user', JSON.stringify(User));
                    alert('Login successful!');
                } else {
                    alert('Invalid username or password. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred during login. Please try again later.');
            });
    };

    if (isLoggedIn) {
        return (
            <div>
                <PostList />
            </div>
        );
    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <form onSubmit={handleFormSubmit}>
                <div className='form-control'>
                    <label htmlFor="username">Username:</label>
                    <TextField
                        type="text"
                        placeholder="Title"
                        id="username" value={username} onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password:</label>
                    <TextField
                        type="password"
                        placeholder="Password"
                        id="password" value={password} onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='form-button'>
                    <Button type="submit" variant="contained">SignIn</Button>
                </div>
            </form>
        </div>
    );
};

export default Login;
