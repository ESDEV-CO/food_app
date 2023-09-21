import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div>
                <div className="mb-4 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="currentColor" className="text-danger bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 1a7 7 0 0 0-7 7 7 7 0 0 0 7 7 7 7 0 0 0 7-7A7 7 0 0 0 8 1zM3.177 3.177a.75.75 0 1 1 1.061-1.06L8 6.94l3.762-3.762a.75.75 0 1 1 1.06 1.06L9.06 8l3.762 3.762a.75.75 0 1 1-1.06 1.06L8 9.06l-3.762 3.762a.75.75 0 1 1-1.06-1.06L6.94 8 3.177 4.238a.75.75 0 0 1 0-1.06z" />
                    </svg>
                </div>
                <div className="text-center">
                    <h1>Your Payment is Canceled</h1>
                    <p> please check you order details </p>
                    <Link to={'/'} className="btn btn-primary">Back Home</Link>
                </div>
            </div>
        </div>
    )
}

export default Cancel