import { useParams,Link } from "react-router-dom";
import React, { useState,useEffect } from 'react';
import axios from "axios";

const SingleCategory = ():JSX.Element => {
    const {category} = useParams<string>()
    const [categoryItems, setCategoryItems] = useState<any[] | null>(null);

    useEffect(()=>{
        const getCategoryItems = async() =>{
            const items = await axios.get<any[]>(`http://localhost:9000/api/products/categories/${category}`);
            const data = items.data;
            if(items.status === 200){
                setCategoryItems(data);
            }
        }
        getCategoryItems()
    })
    return ( 
        <div className="category-items">
            {categoryItems ? (
                categoryItems.map(item => {
                    const finalPrice = parseFloat(item.price) * (parseFloat(item.discount) / 100)
                    return(
                        <div className="content">
                            <div className="content-products">
                                <div className="products">
                                    <div className="singleone">
                                        <div className="image">
                                            <img src={item.imageUrl} alt="" />
                                        </div>
                                        <div className="other-details">
                                            <h4>{item.title}</h4>
                                            <p><strong>Units left: </strong>{item.quantity}</p>
                                            {(parseFloat(item.discount) > 0.0) ? (
                                                <div className="discount-item">
                                                    <p className="initial-price">Ush {item.price}</p>
                                                    <p>Ush {finalPrice}</p>
                                                </div>
                                            ):(
                                                <div>
                                                    <p className="nodiscount">No discount on item</p>
                                                    <p>Ush{item.price}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="product-link">
                                            <Link to={`/product/${item._id}`}>View product</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            ):(
                <p>Loading...</p>
            ) }
        </div>
    );
}
 
export default SingleCategory;