import React, { useState } from 'react'
import axios from 'axios';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPortal = () => {
    const [formData, setFormData] = useState({
        productName: '',
        url: '',
        description: '',
        category: '',
        options: [],
        price: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/handleFoodData', formData);

            if (response.status === 200) {
                // Handle a successful response from the server
                toast.success(' Data Send Successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                // Optionally, reset the form fields here
                setFormData({
                    productName: '',
                    url: '',
                    description: '',
                    category: '',
                    options: [],
                    price: '',
                });
            } else {
                // Handle errors from the server
                console.error('Failed to send data to the server');
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error:', error);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div>
            <Navbar />
            <div className="container py-5">
                <div className="col g-5">
                    <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3 text-success">Add products to Database</h4>
                        <form onSubmit={handleSubmit} className="needs-validation was-validated" novalidate="">
                            <div className="row g-3">
                                <div className="col-12">
                                    <label htmlFor="productName" className="form-label">Product Name</label>
                                    <input type="text" className="form-control" id="productName" name="productName" placeholder="Food Name" value={formData.productName} onChange={handleChange} required />
                                    <div className="invalid-feedback">
                                        Valid name is required
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="url" className="form-label">Image URl</label>
                                    <input type="text" className="form-control" id="url" name="url" placeholder="HTTPS://" value={formData.url} onChange={handleChange} required />
                                    <div className="invalid-feedback">
                                        Valid Image URl is required
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name="description" placeholder="1234 Main St" value={formData.description} onChange={handleChange} required />
                                    <div className="invalid-feedback">
                                        Please enter your Product Description.
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="category" className="form-label">Category Name</label>
                                    <select className="form-select" id="category" name="category" value={formData.category} onChange={handleChange} required >
                                        <option value="">Choose...</option>
                                        <option>Biryani/Rice</option>
                                        <option>Starter</option>
                                        <option>Pizza</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a Category.
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="options" className="form-label">Options</label>
                                    <select className="form-select" id="options" name="options" value={formData.options} onChange={handleChange} required>
                                        <option value="">Choose...</option>
                                        <option>Half</option>
                                        <option>Full</option>
                                        <option>Regular</option>
                                        <option>Medium</option>
                                        <option>Large</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a Option.
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="text" className="form-control" id="price" name="price"
                                        placeholder="Rs"
                                        value={formData.price}
                                        onChange={handleChange} required />
                                    <div className="invalid-feedback">
                                        Price required
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4" />

                            {/* <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="save-info" />
                                <label className="form-check-label" htmlFor="save-info">Save this information for next time</label>
                            </div> */}

                            <button className="w-100 btn btn-success btn-lg mt-3 " type="submit" >Add to DB</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    )
}

export default AdminPortal