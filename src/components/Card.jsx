import React from 'react'

const Card = () => {
    return (
        <div className="card mt-3 " style={{ "width": " 18rem", objectFit: 'contain !important' }}>
            <img src="https://source.unsplash.com/random/300x300/?food-plate" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some Important text </p>
                <div className="container w-100 d-flex justify-content-center align-items-center gap-2  ">
                    <select className='m-2 h-100  bg-success text-white rounded  '>
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            )
                        })}
                    </select>
                    <select className=' h-100  bg-success text-white rounded  '>
                        <option value="half">Half</option>
                        <option value="full">Full</option>
                    </select>
                    <div className='h-100 fs-5 '>Total Price</div>
                </div>
            </div>
        </div>
    )
}

export default Card