import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Layout from "../../../components/Layout"
import HeaderLibrarian from '../../../components/HeaderLibrarian'
import TableLibBooks from '../../../components/TableLibBooks';

function ListBooks() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await window.axios.get('/api/books/list');
                setBooks(response.data);
            } catch (err) {
                setError(err.message);
                setBooks(null);
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
                        <Link to='/librarian/books/add' className='btn btn-success'>Add book</Link>
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-md-12'>
                        <TableLibBooks data={books} rowsPerPage={4} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ListBooks;