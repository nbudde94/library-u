import React, {useEffect} from 'react';
import { Link, useLocation } from "react-router-dom";
 
function HeaderLibrarian() {
    const location = useLocation();
    const pageLinks = [
        {
            "name": "Check-outs",
            "url" :"/librarian/checkouts",
        },
        {
            "name": "Books",
            "url" :"/librarian/books",
        },
        {
            "name": "Users",
            "url" :"/librarian/users",
        },
        {
            "name": "Log out",
            "url" :"/",
        }
 
    ];
 
    useEffect(() => {
        pageLinks.map((page)=>{
            if(page.url == location.pathname) {
                document.title = page.name;
            }
        });
    }, [])
 
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="#" className="navbar-brand">Library</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
 
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {
                        pageLinks.map((page, key) => {
                            return (
                                <li key={key} className={`nav-item ${location.pathname == page.url ? 'active' : ''}`}>
                                    <Link to={page.url} className="nav-link">{page.name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </nav>
    );
}
  
export default HeaderLibrarian;