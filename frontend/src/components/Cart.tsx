import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



interface CartItemsStructure{
    _id:string,
    title:string,
    price:string,
    itemquantity:number,
    addtime:string,
    itemPhotoUrl:string,
    discount:string
}

const Cart = ():JSX.Element => {
    const [cartitems, setCartItems] = useState<CartItemsStructure[] | null >(null);
    const [subTotal, setSubTotal] = useState<number>(0);

    const fetchCartDetails = async() =>{
        try {
            const cartdetails = await axios.get<CartItemsStructure[]>(`http://localhost:9000/api/cart`)
            if(cartdetails.status === 200){
                console.log(cartdetails.data)
                setCartItems(cartdetails.data);
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(()=>{
        fetchCartDetails()
    },[]);

    useEffect(()=>{
        if(cartitems){
            const calculatedSubTotal = cartitems.reduce(
                (total,item)=> total + parseFloat(item.price) * item.itemquantity, 0);

            setSubTotal(calculatedSubTotal);
        }
    },[cartitems]);

    const handleIncreaseQuantity = (itemId:string) =>{
        setCartItems((prevItems)=>{
            if(prevItems){
                const updatedItems = prevItems?.map((item)=>{
                    if(item._id === itemId){
                        return { ...item, itemquantity : item.itemquantity + 1  }
                    }
                    return item;
                });
                const calculatedSubTotal = updatedItems.reduce(
                    (total, item) => total + parseFloat(item.price) * item.itemquantity,
                    0
                  );
                setSubTotal(calculatedSubTotal);
                return updatedItems
            }
            return prevItems;
        });
    }

    const handleDecreaseQuantity = (itemId:string) =>{
        setCartItems((prevItems)=>{
            if(prevItems){
                const updatedItems = prevItems?.map((item)=>{
                    if(item._id === itemId){
                        return { ...item, itemquantity: item.itemquantity - 1 }
                    }
                    return item;
                });
                const calculatedSubTotal = updatedItems.reduce(
                    (total, item) => total + parseFloat(item.price) * item.itemquantity,
                    0
                  );
                setSubTotal(calculatedSubTotal);
                return updatedItems;
            }
            return prevItems;
        })
    }

    const removeItemFromCart = async(itemId:string) =>{
        try {
            const deleteCartItem = await axios.delete(`http://localhost:9000/api/cart/remove/${itemId}`);

            if(deleteCartItem.status === 200){
                toast.success('Item removed from the cart successfully cart successfully', {
                    position: 'top-right'
                  });

                fetchCartDetails();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <div className="cartpage">
            <div>
                { cartitems ? (
                    cartitems.length > 0 ? (
                        cartitems.map(item => {
                            const finalPrice = parseFloat(item.price) * (parseFloat(item.discount) / 100)
                            const totalPrice = parseFloat(item.price) * item.itemquantity;
                            return(
                            <div>
                                <div className='cart'>
                                    <div className="cartimage">
                                        <img src={item.itemPhotoUrl} alt="item"/>
                                    </div>
                                    <div className="cartdets">
                                        <div className="cartitemdetails">
                                            <h3>{item.title}</h3>
                                            <div className="quantity">
                                                <button onClick={()=> handleIncreaseQuantity(item._id)}>+</button>
                                                <h4 className='itemquantity'>{item.itemquantity}</h4>
                                                <button onClick={()=> handleDecreaseQuantity(item._id)} disabled={item.itemquantity === 1}>-</button>
                                            </div>
    
                                            <h4>Total price: Ush.{finalPrice}</h4>
                                            <h4 className='initialcartitemprice'>Ush.{item.price}</h4>
                                            <div className="removeitem">
                                                <button onClick={()=>removeItemFromCart(item._id)}>Remove item</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        })
                    ):(
                        <div className="cartempty">
                            <div className="cartticon">
                                <FontAwesomeIcon className='carticon' icon={faShoppingCart} />
                            </div>
                            <h4>Your cart is empty!!</h4>
                            <Link to={'/products'}>Start shopping</Link>
                        </div>
                    )
                    
                ):(
                    <p>Loading...</p>
                )}
            </div>
            <div className='subtotal'>
                <h2>CART SUMMARY</h2>
                <h3>Subtotal: Ush. {subTotal}</h3>
                <button className='checkout'>CHECKOUT  (Ush. {subTotal})</button>
            </div>
        </div>
     );
}
 
export default Cart;