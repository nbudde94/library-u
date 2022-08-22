import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/Layout"
import HeaderLibrarian from '../../../components/HeaderLibrarian'
import Swal from 'sweetalert2';
import { useEffect, useState } from "react";

function EditBook() {
    let { id } = useParams();
    const [book, setBook] = useState({
        bookItem: {
            title: '',
            author: '',
            genre: '',
            published_year: '',
            stock_amount: ''
        }
    })
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const bookParams = {
            title: formData.get('title'),
            author: formData.get('author'),
            genre: formData.get('genre'),
            published_year: formData.get('published_year'),
            stock_amount: formData.get('stock_amount')
        }
        window.axios.put('/api/books/update/' + id, bookParams).then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Book edited successfully.'
            })
            navigate("/librarian/books");
        })
    }

    useEffect(() => {
        const getData = async () => {
            try {
                let response = await window.axios.get('/api/books/edit/' + id)
                setBook({
                    ...book,
                    bookItem: response.data
                })
            } catch (error) {
                console.log(err.message)
            }
        }
        getData()
    }, []);

    let updateInput = (event) => {
        setBook({
            ...book,
            bookItem: {
                ...book.bookItem,
                [event.target.name]: event.target.value
            }
        })
    }

    let { bookItem } = book

    return (
        <Layout>
            <HeaderLibrarian />
            <div className="row d-flex justify-content-start">
                <div className="col-md-3">
                    <Link to='/librarian/books' className='btn btn-info'>Back</Link>
                </div>
            </div>
            <div className="row d-flex justify-content-center mt-3">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            Edit Book
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input name="title" id="title" className="form-control mt-2" type="text" placeholder="Type title book" value={bookItem.title} onChange={updateInput} />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Author</label>
                                    <input name="author" id="author" className="form-control mt-2" type="text" placeholder="Type author book" value={bookItem.author} onChange={updateInput} />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Genre</label>
                                    <input name="genre" id="genre" className="form-control mt-2" type="text" placeholder="Type genre book" value={bookItem.genre} onChange={updateInput} />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Published year</label>
                                    <input name="published_year" id="published_year" className="form-control mt-2" type="text" placeholder="Type published year book" value={bookItem.published_year} onChange={updateInput} />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Stock amount</label>
                                    <input name="stock_amount" id="stock_amount" className="form-control mt-2" type="text" placeholder="Type stock amount book" value={bookItem.stock_amount} onChange={updateInput} />
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

export default EditBook;