import React, { useState, useRef } from 'react'
import Layout from "../../components/Layout";
import HeaderStudent from '../../components/HeaderStudent';
import TableBooks from '../../components/TableBooks';

function HomeStudent() {
    const [books, setBooks] = useState([]);
    const [isLooking, setIsLooking] = useState(false);
    const ref = useRef(null);
    const ref1 = useRef('title')
    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const bookParams = {
            params: {
                keyword: formData.get('keyword'),
                type: formData.get('type')
            }
        }
        getSearchData(bookParams)
    }

    function getSearchData(bookParams) {
        window.axios.get('/api/books/filter', bookParams).then((response) => {
            setBooks(response.data)
            setIsLooking(true)
        })
    }

    const clearBtn = (event) => {
        event.preventDefault()
        setIsLooking(false)
        setBooks([])
        ref.current.value = '';
        ref1.current.value = 'title'
    }

    return (
        <Layout>
            <HeaderStudent />
            <div className="container">
                <div className='card mt-3'>
                    <div className='card-header'>Search book</div>
                    <div className='card-body'>
                        <div className='row'>
                            <form onSubmit={handleSubmit}>
                                <input ref={ref} className='form-control' type='text' id='keyword' name='keyword' placeholder='Type something...' />
                                <select ref={ref1} id="type" name="type" className='form-control mt-3'>
                                    <option value='title'>Title</option>
                                    <option value='author'>Author</option>
                                    <option value='genre'>Genre</option>
                                </select>
                                <button type='submit' className='btn btn-info btn-md mt-3'>Search</button>
                                <button onClick={e => clearBtn(e)} className='btn btn-warning btn-md mt-3 mx-3'>Clear</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-md-12' style={{ display: isLooking == true ? "block" : "none" }}>
                        <TableBooks data={books} rowsPerPage={4} getData={getSearchData} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default HomeStudent;