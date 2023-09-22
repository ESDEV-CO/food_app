import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const AdminPortal = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        country: '',
        state: '',
        zip: '',
        paymentMethod: 'credit',
    });
    console.log(formData);

    const handleSubmit = (e) => {
        e.preventDefault();

    }
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
                                    <label htmlFor="lastName" className="form-label">Product Name</label>
                                    <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Food Name" value={formData.lastName} onChange={handleChange} required />
                                    <div className="invalid-feedback">
                                        Valid name is required                                   </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="lastName" className="form-label">Image URl</label>
                                    <input type="text" className="form-control" id="lastName" name="lastName" placeholder="HTTPS://" value={formData.lastName} onChange={handleChange} required />
                                    <div className="invalid-feedback">
                                        Valid Image URl is required                                   </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="address" name="address" placeholder="1234 Main St" value={formData.address} onChange={handleChange} required />
                                    <div className="invalid-feedback">
                                        Please enter your Product Description.
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="country" className="form-label">Category Name</label>
                                    <select className="form-select" id="country" name="country" value={formData.country} onChange={handleChange} required >
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
                                    <label htmlFor="state" className="form-label">Options</label>
                                    <select className="form-select" id="state" name="state" value={formData.state} onChange={handleChange} required>
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
                                    <label htmlFor="zip" className="form-label">Price</label>
                                    <input type="text" className="form-control" id="zip" name="zip"
                                        placeholder="Rs"
                                        value={formData.zip}
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
        </div>
    )
}

export default AdminPortal