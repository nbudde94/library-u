import { Link, useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout"
import HeaderLibrarian from '../../../components/HeaderLibrarian'
import Swal from 'sweetalert2';

function CreateUser() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const userParams = {
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            email: formData.get('email'),
            password: formData.get('password'),
            role: formData.get('role')
        }
        window.axios.post('/api/users/store', userParams).then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'User added successfully.'
            })
            navigate("/librarian/users");
        })
    }
    return (
        <Layout>
            <HeaderLibrarian />
            <div className="row d-flex justify-content-start">
                <div className="col-md-3">
                    <Link to='/librarian/users' className='btn btn-info'>Back</Link>
                </div>
            </div>
            <div className="row d-flex justify-content-center mt-3">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            Create User
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>First name</label>
                                    <input name="first_name" id="first_name" className="form-control mt-2" type="text" placeholder="Type first name" />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Last name</label>
                                    <input name="last_name" id="last_name" className="form-control mt-2" type="text" placeholder="Type last name" />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Email</label>
                                    <input className="form-control mt-2" type="text" id="email" name="email" placeholder="Type email" />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Password</label>
                                    <input className="form-control mt-2" type="password" id="password" name="password" placeholder="Type Password" />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Confirm password</label>
                                    <input className="form-control mt-2" type="password" id="password1" name="password1" placeholder="Confirm Password" />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Select role</label>
                                    <select id="role" name="role" className='form-control mt-2'>
                                        <option value='student'>Student</option>
                                        <option value='librarian'>Librarian</option>
                                    </select>
                                </div>
                                <div className="row d-flex justify-content-center mt-3">
                                    <div className="col-md-4">
                                        <button type="submit" className="btn btn-success mt-3">Create user</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateUser;