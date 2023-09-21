import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { loadStripe } from '@stripe/stripe-js'


const CheckOut = () => {
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
    let totalPrice = localStorage.getItem("total-price")

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
    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51NsK7LI97mld8Ot2sexNH1X7Db8ow2clm9UyAw1VDTUO7VLNhxas5EKkSQiP8WGJpKJYm9QZsoiIDYeK9TDmSK1O00C6nutpu4");

        const response = await fetch('http://localhost:5000/api/checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                totalPricePay: totalPrice
            })
        });

        if (response.status === 200) {
            const session = await response.json();

            // console.log("session ::", session)


            // Now you can access the session data
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                console.log(result.error);
            }
        } else {
            // Handle non-200 status codes, e.g., display an error message
            console.error('API request failed with status:', response.status);
        }

    };


    return (
        <div>
            <Navbar />
            <div className="container py-5">
                <div className="col g-5">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-success">Your Order</span>
                            <span className="badge bg-success ">{`Rs ${totalPrice}/-`}</span>
                        </h4>

                    </div>
                    <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3 text-success">Billing address</h4>
                        <form onSubmit={handleSubmit} className="needs-validation was-validated" novalidate="">
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="firstName" className="form-label">First name</label>
                                    <input type="text" className="form-control" id="firstName" name="firstName" placeholder="John" value={formData.firstName} onChange={handleChange} required='' />
                                    <div className="invalid-feedback">
                                        Valid first name is required.
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="lastName" className="form-label">Last name</label>
                                    <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} required='' />
                                    <div className="invalid-feedback">
                                        Valid last name is required.
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Email </label>
                                    <input type="email" className="form-control" id="email" name='email' placeholder="you@example.com" value={formData.email} onChange={handleChange} />
                                    <div className="invalid-feedback">
                                        Please enter a valid email address for shipping updates.
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" className="form-control" id="address" name="address" placeholder="1234 Main St" value={formData.address} onChange={handleChange} required='' />
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="country" className="form-label">Province</label>
                                    <select className="form-select" id="country" name="country" value={formData.country}
                                        onChange={handleChange} required='' >
                                        <option value="">Choose...</option>
                                        <option>Punjab</option>
                                        <option>KPK</option>
                                        <option>Sindh</option>
                                        <option>Balochistan</option>
                                        <option>Islamabad</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid Province.
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="state" className="form-label">City</label>
                                    <select className="form-select" id="state" name="state"
                                        value={formData.state}
                                        onChange={handleChange} required=''>
                                        <option value="">Choose...</option>
                                        <option>Lahore</option>
                                        <option>ISB</option>
                                        <option>Multan</option>
                                        <option>Karachi</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid City Name.
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="zip" className="form-label">Zip</label>
                                    <input type="text" className="form-control" id="zip" name="zip"
                                        placeholder="12345"
                                        value={formData.zip}
                                        onChange={handleChange} />
                                    <div className="invalid-feedback">
                                        Zip code required.
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4" />

                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="save-info" />
                                <label className="form-check-label" htmlFor="save-info">Save this information for next time</label>
                            </div>
                            <hr className="my-4" />
                            <h4 className="mb-3">Payment</h4>
                            <div className="d-flex gap-3 my-3">
                                <div className="form-check">
                                    <input id="credit" name="paymentMethod" type="radio" className="form-check-input" checked="" required="" onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="credit">Credit card</label>
                                </div>
                                <div className="form-check">
                                    <input id="debit" name="paymentMethod" type="radio" className="form-check-input" required="" onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="debit">Debit card</label>
                                </div>
                                <div className="form-check">
                                    <input id="cod" name="paymentMethod" type="radio" className="form-check-input" required="" onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="paypal">COD</label>
                                </div>
                            </div>
                            <div className="row gy-3">
                                <div className="col-md-6">
                                    <label htmlFor="cc-name" className="form-label">Name on card</label>
                                    <input type="text" className="form-control" id="cc-name" name="ccName"
                                        value={formData.ccName}
                                        onChange={handleChange} placeholder="John Doe" required='' />
                                    <small className="text-muted">Full name as displayed on card</small>
                                    <div className="invalid-feedback">
                                        Name on card is required
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="cc-number" className="form-label">Credit card number</label>
                                    <input type="text" className="form-control" id="cc-number" placeholder="4242 4242 4242 4242" required='' />
                                    <div className="invalid-feedback">
                                        Credit card number is required
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                                    <input type="text" className="form-control" id="cc-expiration" placeholder="12/34" required='' />
                                    <div className="invalid-feedback">
                                        Expiration date required
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="cc-cvv" className="form-label">CVV</label>
                                    <input type="text" className="form-control" id="cc-cvv" placeholder="" required="" onChange={handleChange} />
                                    <div className="invalid-feedback">
                                        Security code required
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4" />

                            <button className="w-100 btn btn-success btn-lg mt-3 " type="submit" onClick={makePayment}>Continue to Pay</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CheckOut