import React, { useState, useEffect } from 'react'
import Layout from "../../components/Layout"
import HeaderLibrarian from '../../components/HeaderLibrarian'
import TableLibrarianCheckout from '../../components/TableLibrarianCheckout';

function CheckoutLibrarian() {
    const [checkouts, setCheckouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function getCheckoutsLibData() {
        window.axios.get('/api/librarian/checkouts').then((response) => {
            setCheckouts(response.data);
        });
    }

    useEffect(() => {
        const getData = async () => {
            try {
                getCheckoutsLibData()
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
                        <TableLibrarianCheckout data={checkouts} rowsPerPage={4} getData={getCheckoutsLibData} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CheckoutLibrarian;