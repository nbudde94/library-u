import { useState, useEffect } from "react";
import Layout from "../../components/Layout"
import HeaderStudent from '../../components/HeaderStudent';
import TableStudentCheckouts from '../../components/TableStudentCheckout';

function CheckoutStudent() {
    const [checkouts, setCheckouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await window.axios.get('/api/students/checkouts');
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
            <HeaderStudent />
            <div className="container">
                <div className='row mt-5'>
                    <div className='col-md-12'>
                        <TableStudentCheckouts data={checkouts} rowsPerPage={4} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CheckoutStudent;