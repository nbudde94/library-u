import React from 'react'
import Layout from "../../components/Layout"
import HeaderStudent from '../../components/HeaderStudent';
  
function CheckoutStudent() {
 
    return (
        <Layout>
            <HeaderStudent/>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Checkout Student Page</h2>
            </div>
        </Layout>
    );
}
  
export default CheckoutStudent;