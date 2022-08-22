import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/Layout"
import HeaderLibrarian from '../../../components/HeaderLibrarian'
import Swal from 'sweetalert2';
import { useEffect, useState } from "react";

function EditUser() {
    let { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userData: {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        }
    })
    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const userParams = {
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            email: formData.get('email'),
            password: formData.get('password')
        }
        window.axios.put('/api/users/update/' + id, userParams).then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'User edited successfully.'
            })
            navigate("/librarian/users");
        })
    }

    useEffect(() => {
        const getData = async () => {
            try {
                let response = await window.axios.get('/api/users/edit/' + id)
                setUser({
                    ...user,
                    userData: response.data
                })
            } catch (error) {
                console.log(err.message)
            }
        }
        getData()
    }, []);

    let updateInput = (event) => {
        setUser({
            ...user,
            userData: {
                ...user.userData,
                [event.target.name]: event.target.value
            }
        })
    }

    let { userData } = user

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
                            Edit User
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>First name</label>
                                    <input name="first_name" id="first_name" className="form-control mt-2" type="text" placeholder="Type first name" value={userData.first_name} onChange={updateInput} />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Last name</label>
                                    <input name="last_name" id="last_name" className="form-control mt-2" type="text" placeholder="Type last name" value={userData.last_name} onChange={updateInput} />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Email</label>
                                    <input className="form-control mt-2" type="text" id="email" name="email" placeholder="Type email" value={userData.email} onChange={updateInput} />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Password</label>
                                    <input className="form-control mt-2" type="password" id="password" name="password" placeholder="Type Password" />
                                </div>
                                <div className="row d-flex justify-content-center mt-3">
                                    <div className="col-md-4 d-flex justify-content-center">
                                        <button type="submit" className="btn btn-info mt-3">Save changes</button>
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

export default EditUser;