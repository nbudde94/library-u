import React, { useState, useEffect} from 'react'
import Layout from "../../components/Layout"
import HeaderLibrarian from '../../components/HeaderLibrarian'
import TableLibrarianCheckout from '../../components/TableLibrarianCheckout';

function CheckoutLibrarian() {
    const [checkouts, setCheckouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await window.axios.get('/api/librarian/checkouts');
                setCheckouts(response.data);
            } catch (err) {
                setError(err.message);
                setCheckouts(null);
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
                <div className='row mt-5'>
                    <div className='col-md-12'>
                        <TableLibrarianCheckout data={checkouts} rowsPerPage={4} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CheckoutLibrarian;