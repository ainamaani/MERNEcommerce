import {useContext} from 'react';
import {ProductsContext} from '../contexts/ProductsContext'

const useProductsContext = () => {
   const context = useContext(ProductsContext);
   if(!context){
    throw new Error ("You cannot access this context");
   } 
   return context;
}
 
export default useProductsContext;