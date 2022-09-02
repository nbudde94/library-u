import React, { useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import Layout from "../../../components/Layout"
import HeaderLibrarian from '../../../components/HeaderLibrarian'
import TableUsers from '../../../components/TableUsers';

function ListUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function getUsersList() {
        window.axios.get('/api/users/list').then((response) => {
            setUsers(response.data);
        })
    }

    useEffect(() => {
        const getData = async () => {
            try {
                getUsersList()
            } catch (err) {
                setError(err.message);
                setUsers(null);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [])

    return (
        <Layout>
            <HeaderLibrarian />
            <div className="container">
                <div className='row d-flex justify-content-start mt-3'>
                    <div className='col-md-3'>
                        <Link to='/librarian/users/add' className='btn btn-success'>Add user</Link>
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-md-12'>
                        <TableUsers data={users} rowsPerPage={4} getData={getUsersList} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ListUsers;