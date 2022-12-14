import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Layout from "../../../components/Layout"
import HeaderLibrarian from '../../../components/HeaderLibrarian'
import TableLibBooks from '../../../components/TableLibBooks';

function ListBooks() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function getBookList() {
        window.axios.get('/api/books/list').then((response) => {
            setBooks(response.data);
        })
    }
    useEffect(() => {
        const getData = async () => {
            try {
                getBookList()
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
                        <TableLibBooks data={books} rowsPerPage={4} getData={getBookList} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ListBooks;