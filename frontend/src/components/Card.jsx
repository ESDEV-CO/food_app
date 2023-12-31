import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = (props) => {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")

    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (food.length !== 0) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
                // console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }
        await dispatch({ type: 'ADD', id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
        toast.success('Added to cart!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: 0,
            theme: "light",
        });
    }
    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div className="card mt-3 object-fit-cover ">
            <img src={props.foodItem.img} className="card-img-top object-fit-cover" alt="..." style={{ height: " 190px" }} />
            <div className="card-body">
                <h5 className="card-title">{props.foodItem.name}</h5>
                <p className="card-text custom-line-clamp">{props.foodItem.description}</p>
                <div className=" w-100  ">
                    <select className='m-2 h-100  bg-success text-white rounded ' onChange={(e) => setQty(e.target.value)}>
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            )
                        })}
                    </select>
                    <select className='m-2 h-100  bg-success text-white rounded ' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                        {priceOptions.map((data) => {
                            return <option key={data} value={data}>{data}</option>
                        })}
                    </select>
                    <div className='d-inline h-100 fs-5 '>Rs {finalPrice}/- </div>
                    <hr />
                    <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Card