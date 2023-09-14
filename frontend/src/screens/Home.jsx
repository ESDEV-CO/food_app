import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { useState, useEffect } from 'react'


const Home = () => {
    const [search, setSearch] = useState('')
    const [foodCat, setFoodCat] = useState([])
    const [foodData, setFoodData] = useState([])
    const loadData = async () => {
        let foodData = await fetch("http://localhost:5000/api/foodData", {
            method: "GET",
            headers: {
                'Content-Type': 'Application/json'
            }
        })
        foodData = await foodData.json()
        // console.log(foodData);
        setFoodData(foodData)
        let foodCat = await fetch("http://localhost:5000/api/categories", {
            method: "GET",
            headers: {
                'Content-Type': 'Application/json'
            }
        })
        foodCat = await foodCat.json()

        // console.log(foodCat.categories);
        setFoodCat(foodCat.categories)
    }
    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <Navbar />
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner " id='carousel-img'>
                    <div className="carousel-caption " style={{ zIndex: '10' }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                            {/* <button className="btn btn-outline-success text-white " type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active fade ">
                        <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100 " style={{ filter: 'brightness(30%)' }} alt="..." />
                    </div>
                    <div className="carousel-item fade ">
                        <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: 'brightness(30%)' }} alt="..." />
                    </div>
                    <div className="carousel-item fade ">
                        <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100  " style={{ filter: 'brightness(30%)' }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="m-3 container">
                {
                    foodCat ?
                        foodCat.map((data) => {
                            return (
                                <div key={data?._id} className='row mb-3 gap-4'>
                                    <div key={data?._id} className='fs-3 m-3 '>
                                        {data?.CategoryName}
                                    </div>
                                    <hr />
                                    {foodData ? foodData.filter((item) => (item?.CategoryName === data?.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems?._id} className=' col-12 col-md-6 col-lg-3'>
                                                    <Card foodName={filterItems.name}
                                                        options={filterItems.options[0]}
                                                        imgSrc={filterItems.img}
                                                        description={filterItems.description}
                                                    ></Card>
                                                </div>
                                            )
                                        })
                                        : <div>No Such Data Found</div>}
                                </div>
                            )
                        }) : ""
                }
            </div>
            <Footer />
        </div>
    )
}

export default Home