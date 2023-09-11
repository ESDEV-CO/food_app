import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top px-3 ">
            <p className="col-md-4 mb-0 text-muted">© 2023 GoFood, Inc</p>

            <ul className="nav col-md-4 justify-content-end">
                <li className="nav-item"><Link href="/" className="nav-link px-2 text-muted">Home</Link></li>
                <li className="nav-item"><Link href="/" className="nav-link px-2 text-muted">Features</Link></li>
                <li className="nav-item"><Link href="/" className="nav-link px-2 text-muted">Pricing</Link></li>
                <li className="nav-item"><Link href="/" className="nav-link px-2 text-muted">FAQs</Link></li>
                <li className="nav-item"><Link href="/" className="nav-link px-2 text-muted">About</Link></li>
            </ul>
        </footer>
    )
}

export default Footer