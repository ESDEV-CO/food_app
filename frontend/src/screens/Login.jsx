import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [credential, setCredential] = useState({ email: '', password: '' })
    let navigate = useNavigate()
    const onChangeData = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: credential.email, password: credential.password
            })
        });
        const json = await response.json()
        console.log(json);
        if (!json.success) {
            alert('Enter Valid Credentials')
        }
        if (json.success) {
            navigate('/')
        }
    }
    return (

        <div>
            <Navbar />
            <div className="mt-3 container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credential.email} onChange={onChangeData} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credential.password} onChange={onChangeData} />
                    </div>
                    <button type="submit" className="btn btn-success" >Log In</button>
                    <Link to={'/signup'} className='m-3 btn btn-danger' >Sign Up</Link>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Login