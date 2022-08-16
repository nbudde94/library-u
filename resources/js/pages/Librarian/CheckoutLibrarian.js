import React from 'react'
import Layout from "../../components/Layout"
import HeaderLibrarian from '../../components/HeaderLibrarian'
  
function CheckoutLibrarian() {
 
    return (
        <Layout>
            <HeaderLibrarian/>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Checkout Librarian Page</h2>
            </div>
        </Layout>
    );
}
  
export default CheckoutLibrarian;