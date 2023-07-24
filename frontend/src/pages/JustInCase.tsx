import {useEffect,useState} from 'react';
import axios from 'axios'
import useProductsContext from '../hooks/UseProductsContext';
import ProductsDetails from './ProductsDetails';

interface SearchResults{
    _id:string,
    title:string,
    description:string,
    category:string,
    price:string,
    quantity:string,
    imageUrl:string,
    discount:string
}

const Products = ():JSX.Element => {
    const {products, dispatch} = useProductsContext();
    const [searchQuery,setSearchQuery] = useState<String>('');
    const [searchResults,setSearchResults] = useState<SearchResults[] | undefined >([]);
    const [showSuggestions,setShowSuggestions] = useState<boolean>(false)

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
    },[dispatch]);

    const handleSearch = () =>{
        const results = products?.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setSearchResults(results);
    }

    return (
       <div>
            <div className="search">
                <input type="text" placeholder='Search product by title'
                onChange={(e)=>{setSearchQuery(e.target.value)}}
                />
                <button onClick={handleSearch}>Search product</button>
            </div>
           <div className="products">

                {
                    searchResults ? (
                        searchResults.length > 0 ? (
                            searchResults.map(product => <ProductsDetails key={product._id} product={product} />)
                        ):(
                            products && products.map(product => <ProductsDetails key={product._id} product={product} />)
                        )
                    ):(
                        <h4>Loading.....</h4>
                    )
                }
                
           </div> 
       </div>
    );
}
 
export default Products;