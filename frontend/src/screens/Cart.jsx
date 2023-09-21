import React, { useState } from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { AiOutlineDelete } from 'react-icons/ai'
// import { useNavigate } from 'react-router';
import { loadStripe } from '@stripe/stripe-js'



const Cart = () => {
    const [isLoading, setIsLoading] = useState(false);
    let data = useCart();
    let dispatch = useDispatchCart();
    // let navigate = useNavigate()

    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }
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
    const handleCheckOut = async () => {
        setIsLoading(true);
        let userEmail = localStorage.getItem("userEmail");
        // console.log(data,localStorage.getItem("userEmail"),new Date())
        let response = await fetch("http://localhost:5000/api/orderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                total_price: totalPrice,
                order_date: new Date().toDateString()
            })
        });
        // console.log("JSON RESPONSE:::::", response.status)
        // console.log("JSON  Data:::::", response)
        if (response.status === 200) {

            await makePayment()

            dispatch({ type: "DROP" })
            // navigate('/checkout')
            setIsLoading(false);
        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    localStorage.setItem("total-price", totalPrice)

    return (
        <div>
            <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr >
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope='row' >{index + 1}</th>
                                <td >{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td ><button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}><AiOutlineDelete size={20} /></button> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='d-flex justify-content-between'>
                    <h3>Total Price: {totalPrice}</h3>
                    <button className="btn bg-success text-white mt-1" onClick={handleCheckOut}>{isLoading ? 'Loading...' : 'Check Out'}</button>
                </div>
            </div>
        </div>
    )
}

export default Cart 