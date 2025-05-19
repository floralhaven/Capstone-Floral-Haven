import React, { useState } from 'react';
import '../style/Main.css';  

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;

        if (!usernameRegex.test(formData.username)) {
            newErrors.username = 'Username must be 3-15 characters and can only contain letters, numbers, and underscores.';
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Login successful:', formData);
            // Add login logic here
        }
    };

    return (
        <div>
            <main className="login-container">
                <form id="login-form" className="login-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>

                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                    <br />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                    <br />

                    <button type="submit" id="submitButton">Login</button>
                </form>
            </main>
        </div>
    );
};

export default Login;