import { Link, useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout"
import HeaderLibrarian from '../../../components/HeaderLibrarian'
import Swal from 'sweetalert2';

function CreateBook() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const bookParams = {
            title: formData.get('title'),
            author: formData.get('author'),
            genre: formData.get('genre'),
            published_year: formData.get('published_year'),
            stock_amount: formData.get('stock')
        }
        window.axios.post('/api/books/store', bookParams).then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Book added successfully.'
            })
            navigate("/librarian/books");
        })
    }

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
                            Create Book
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input name="title" id="title" className="form-control mt-2" type="text" placeholder="Type title book" />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Author</label>
                                    <input name="author" id="author" className="form-control mt-2" type="text" placeholder="Type author book" />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Genre</label>
                                    <input name="genre" id="genre" className="form-control mt-2" type="text" placeholder="Type genre book" />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Published year</label>
                                    <input name="published_year" id="published_year" className="form-control mt-2" type="text" placeholder="Type published year book" />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Stock amount</label>
                                    <input name="stock" id="stock" className="form-control mt-2" type="text" placeholder="Type stock amount book" />
                                </div>
                                <div className="row d-flex justify-content-center mt-3">
                                    <div className="col-md-3">
                                        <button type="submit" className="btn btn-success mt-3">Create book</button>
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

export default CreateBook;