import React from 'react'

const Card = (props) => {
    let options = props.options;
    let priceOptions = Object.keys(options)

    return (
        <div className="card mt-3 " style={{ "width": " 18rem", objectFit: 'contain !important' }}>
            <img src={props.imgSrc} className="card-img-top" alt="..." style={{ height: " 190px", objectFit: 'contain !important' }} />
            <div className="card-body">
                <h5 className="card-title">{props.foodName}</h5>
                <p className="card-text">{props.description}</p>
                <div className="container w-100 d-flex justify-content-center align-items-center gap-2  ">
                    <select className='m-2 h-100  bg-success text-white rounded  '>
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            )
                        })}
                    </select>
                    <select className=' h-100  bg-success text-white rounded  '>
                        {priceOptions.map((data) => {
                            return <option key={data} value={data}>{data}</option>
                        })}
                    </select>
                    <div className='h-100 fs-5 '>Total Price</div>
                </div>
            </div>
        </div>
    )
}

export default Card