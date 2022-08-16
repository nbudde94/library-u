import React from 'react';
import Layout from "../../components/Layout";
import HeaderStudent from '../../components/HeaderStudent';

function HomeStudent() {
    let books = null;
    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const bookParams = {
            keyword: formData.get('keyword'),
            type: formData.get('type')
        }
        window.axios.get('/api/books/filter', bookParams).then((response) => {
            books = response.data
            console.log(books)
        });
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
                                <input className='form-control' type='text' id='keyword' name='keyword' placeholder='Type something...' />
                                <select className='form-control mt-3'>
                                    <option value='title'>Title</option>
                                    <option value='author'>Author</option>
                                    <option value='genre'>Genre</option>
                                </select>
                                <button type='submit' className='btn btn-info btn-md mt-3'>Search</button>
                                <button className='btn btn-warning btn-md mt-3 mx-3'>Clear</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-md-12'>
                        <table class="table table-stripped table-bordered" cellspacing="0" width="100%">
                            <thead>
                                <tr>
                                    <th scope="col">Item</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default HomeStudent;