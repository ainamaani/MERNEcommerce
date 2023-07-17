import { Link } from "react-router-dom";

interface Product{
    _id:string,
    title:string,
    description:string,
    category:string,
    price:string,
    quantity:string,
    imageUrl:string,
    discount:string
}

interface ProductsDetailsProps{
    product:Product
}

const ProductsDetails = ({product}:ProductsDetailsProps):JSX.Element => {

    const finalPrice = parseFloat(product.price) * (parseFloat(product.discount) / 100)

    return ( 
        <div className="content">
            <div className="content-products">
                <div className="products">
                    <div className="singleone">
                        <div className="image">
                            <img src={product.imageUrl} alt="" />
                        </div>
                        <div className="other-details">
                            <h4>{product.title}</h4>
                            <p><strong>Units left: </strong>{product.quantity}</p>
                            {(parseFloat(product.discount) > 0.0) ? (
                                <div className="discount-item">
                                    <p className="initial-price">Ush {product.price}</p>
                                    <p>Ush {finalPrice}</p>
                                </div>
                            ):(
                                <div>
                                    <p className="nodiscount">No discount on item</p>
                                    <p>Ush{product.price}</p>
                                </div>
                            )}
                        </div>
                        <div className="product-link">
                            <Link to={`/product/${product._id}`}>View product</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ProductsDetails;