import { useParams,Link,useNavigate,Navigate } from "react-router-dom";
import {useState,useEffect} from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProductStructure{
    _id:string,
    title:string,
    description:string,
    category:string,
    price:string,
    quantity:string,
    imageUrl:string,
    discount:string
}

const SingleProduct = ():JSX.Element => {
    const {id} = useParams<string>();
    const navigate = useNavigate();
    const [product,setProduct] = useState<ProductStructure | null>(null);

    useEffect(()=>{
        const getSingleProduct = async() =>{
            try {
                const product = await axios.get<ProductStructure>(`http://localhost:9000/api/products/${id}`);
                const data = product.data;
                console.log(data);
                if(product.status === 200){
                    setProduct(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getSingleProduct()
    },[id])

    const handleDelete = async() =>{
        try {
            const deletejob = await axios.delete<ProductStructure>(`http://localhost:9000/api/products/${id}`);
            const data = deletejob.data;
            console.log(data);
            if(deletejob.status === 200){
                navigate('/products');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddItemToCart = async() =>{
        const itemToBeAdded = {
            product_id:product?._id, 
            title:product?.title,
            price:product?.price,
            itemPhotoUrl:product?.imageUrl,
            discount:product?.discount
        }
        try {
            const additem = await axios.post('http://localhost:9000/api/cart/',
            JSON.stringify(itemToBeAdded),
            {
                headers:{
                    'Content-Type':'application/json'
                }
            }
            );
            if(additem.status === 200){
                toast.success('Product added to cart successfully', {
                    position: 'top-right'
                  });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <div>
            { product ? (
               <div>
                 <div>
                    <div className="single-prod">
                        <div className="single-prod-img">
                            <img src={product.imageUrl} alt="" />
                        </div>
                        <div className="other-prod-details">
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                            <p><strong>Discount: </strong>-{product.discount}%</p>
                            <p><strong>Price: </strong>Ush{product.price}</p>
                        </div>
                    </div>
                    <div className="links-buttons">
                        <Link to={`/updateproduct/${product._id}`}>Update product</Link>
                        <button className="updatebutton" onClick={handleAddItemToCart}>Add item to cart</button>
                        <button className="deletebutton" onClick={handleDelete}>Delete product</button>
                    </div>
                </div>
               
               </div>
            ):(
                <p>Loading...</p>
            )}
        </div>
     );
}
 
export default SingleProduct;