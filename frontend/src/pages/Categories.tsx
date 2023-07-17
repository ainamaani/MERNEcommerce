import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';

const Categories = ():JSX.Element => {
    const [categories, setCategories] = useState<string[] | null>(null);

    useEffect(()=>{
        const getCategories = async()=>{
            try {
                const categories = await axios.get<string[]>('http://localhost:9000/api/products/categories');
                const data = categories.data;
                console.log(categories);
                if(categories.status === 200){
                    setCategories(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getCategories()
    },[])
    return ( 
       <div className="categories">
         { categories ? (
            categories.map(category => {
                return(
                    <div className="category" style={{ backgroundImage: `url('data:image/jpeg;base64,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')` }}>
                        <Link className='categorylink' to={`/categories/${category}`} key={category}>{category}</Link>
                    </div>
                )
            } )
        ):(
            <p>Loading....</p>
        )}
       </div>
     );
}
 
export default Categories;