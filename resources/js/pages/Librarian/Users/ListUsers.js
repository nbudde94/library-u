import React, { useState, useEffect} from 'react'
import Layout from "../../../components/Layout"
import HeaderLibrarian from '../../../components/HeaderLibrarian'
import TableUsers from '../../../components/TableUsers';

function ListUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await window.axios.get('/api/users/list');
                setUsers(response.data);
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
                        <button className='btn btn-success'>Add user</button>
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-md-12'>
                        <TableUsers data={users} rowsPerPage={4} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ListUsers;