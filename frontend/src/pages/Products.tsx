import {useEffect} from 'react';
import axios from 'axios'
import useProductsContext from '../hooks/UseProductsContext';
import ProductsDetails from './ProductsDetails';

const Products = ():JSX.Element => {
    const {products, dispatch} = useProductsContext();

    useEffect(()=>{
        const getProducts = async() =>{
            try {
                const response = await axios.get('http://localhost:9000/api/products/');
                const data = response.data
                if(response.status === 200){
                    dispatch({type:'SET_PRODUCTS',payload:data})
                }
            } catch (error) {
                console.log(error)
            }
        }
        getProducts()
    },[dispatch])
    return (
       <div className="products">
            { products ? (
                products.map(product => <ProductsDetails key={product._id} product={product} />)
            ):(
                <p>Loading....</p>
            )
            }
       </div> 
    );
}
 
export default Products;