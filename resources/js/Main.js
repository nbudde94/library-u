import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Logout from './pages/Logout';
import HomeStudent from "./pages/Student/HomeStudent";
import CheckoutStudent from "./pages/Student/CheckoutStudent";
import CheckoutLibrarian from "./pages/Librarian/CheckoutLibrarian";
import ListBooks from './pages/Librarian/Books/ListBooks';
import AddBooks from './pages/Librarian/Books/CreateBook';
import ListUsers from './pages/Librarian/Users/ListUsers';
import AddUsers from './pages/Librarian/Users/CreateUser';
import EditUser from './pages/Librarian/Users/EditUsers';
import EditBook from './pages/Librarian/Books/EditBook';
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
                <Route path="/librarian/users/add" element={<AddUsers />} />
                <Route path="/librarian/books/add" element={<AddBooks />} />
                <Route path="/librarian/books/edit/:id" element={<EditBook />} />
                <Route path="/librarian/users/edit/:id" element={<EditUser />} />
                <Route path='/logout' element={<Logout />} />
            </Routes>
        </Router>
    );
}

export default Main;

if (document.getElementById('app')) {
    ReactDOM.render(<Main />, document.getElementById('app'));
}