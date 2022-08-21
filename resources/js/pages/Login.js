import React from 'react';
import { useNavigate } from 'react-router-dom';
import user from '../user';

function Login() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const loginCredentials = {
            email: formData.get('email'),
            password: formData.get('password')
        }
        window.axios.post('/api/login', loginCredentials).then((response) => {
            user.authenticated()
            if (response.data.role == 'student') {
                navigate("/student/home");
            } else {
                navigate("/librarian/checkouts");
            }
        })
    }

    return (
        <div className="container">
            <div className="row text-center mt-5">
                <h2>Library App</h2>
            </div>
            <div className="row d-flex justify-content-center mt-3">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            Login
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <input className="form-control" type="text" id="email" name="email" placeholder="Email" />
                                <input className="form-control mt-3" type="password" id="password" name="password" placeholder="Password" />
                                <button type="submit" className="btn btn-success mt-3">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;