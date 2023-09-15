import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [credential, setCredential] = useState({ name: '', email: '', password: '', geolocation: '' })

    const onChangeData = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/signup", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: credential.name, email: credential.email, password: credential.password, location: credential.geolocation
            })
        });
        const json = await response.json()
        console.log(json);
        if (!json.success) {
            toast.error('Enter Valid Credentials!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.success(' Success!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    return (
        <>
            <Navbar />
            <div className="mt-3 container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credential.name} onChange={onChangeData} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credential.email} onChange={onChangeData} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credential.password} onChange={onChangeData} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleAddress1" className="form-label">Address</label>
                        <input type="text" className="form-control" id="exampleAddress1" name='geolocation' value={credential.geolocation} onChange={onChangeData} />
                    </div>
                    <button type="submit" className="btn btn-success" >Sign Up</button>
                    <Link to={'/login'} className='m-3 btn btn-danger' >Already a User</Link>
                </form>
            </div>
            <Footer />
            <ToastContainer />
        </>
    )
}

export default SignUp