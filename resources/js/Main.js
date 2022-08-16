import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomeStudent from "./pages/Student/HomeStudent";
import CheckoutStudent from "./pages/Student/CheckoutStudent";
import CheckoutLibrarian from "./pages/Librarian/CheckoutLibrarian";
import ListBooks from './pages/Librarian/Books/ListBooks';
import ListUsers from './pages/Librarian/Users/ListUsers';
function Main() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/student/home" element={<HomeStudent />} />
                <Route path="/student/checkouts" element={<CheckoutStudent />} />
                <Route path="/librarian/checkouts" element={<CheckoutLibrarian />} />
                <Route path="/librarian/books" element={<ListBooks />} />
                <Route path="/librarian/users" element={<ListUsers />} />
            </Routes>
        </Router>
    );
}

export default Main;

if (document.getElementById('app')) {
    ReactDOM.render(<Main />, document.getElementById('app'));
}