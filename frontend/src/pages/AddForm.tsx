import React,{useState,ChangeEvent} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductForm = ():JSX.Element => {
    const [title,setTitle] = useState<string>();
    const [description,setDescription] = useState<string>();
    const [category,setCategory] = useState<string>();
    const [price,setPrice] = useState<string>();
    const [quantity,setQuantity] = useState<string>();
    const [imageUrl,setImageUrl] = useState<string>();
    const [discount,setDiscount] = useState<string>();

    // const convertToBase64 = (e:ChangeEvent<HTMLInputElement>) =>{
    //     var reader = new FileReader();
    //     const target = e.target as HTMLInputElement;
    //     if(target.files && target.files[0]){
    //         reader.readAsDataURL(target.files[0])
    //     }
    //     reader.onload = () =>{
    //         console.log(reader.result); //base64 string encoded
    //         setImage(reader.result as string);
    //     };
    //     reader.onerror = error =>{
    //         console.log("Error: ", error)
    //     }

    // }

    const handleAddProduct = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:9000/api/products/',
            JSON.stringify({title,description,category,price,quantity,imageUrl,discount}),
            {
                headers :{
                    'Content-Type':'application/json',
                    Accept: "application/json",
                    "Access-Control-Allow-Origin" : "+"
                }
            }
            );
            if(response.status === 200){
                setTitle('');
                setDescription('');
                setCategory('');
                setPrice('')
                setQuantity('');
                setImageUrl('');
                toast.success('Product added successfully', {
                    position: 'top-right'
                  });
            } 
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <div className="content">
            <form onSubmit={handleAddProduct}>
                <h4>Add new product!</h4>
                <label htmlFor="">Product title</label>
                <input type="text" name='title' 
                onChange={(e)=>{setTitle(e.target.value)}} value={title}
                />
                <label htmlFor="">Product description</label>
                <input type="text" name='description'
                onChange={(e)=>{setDescription(e.target.value)}} value={description}
                />
                <label htmlFor="">Product category</label>
                <select value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                    <option value="choose" >Choose category</option>
                    <option value="men" >Men's apparel</option>
                    <option value="women" >Women's apparel</option>
                    <option value="children" >Children's apparel</option>
                    <option value="electronics" >Electronics</option>
                    <option value="appliances" >Appliances</option>
                    <option value="healthbeauty" >Health & Beauty</option>
                    <option value="groceries" >Groceries</option>
                </select>
                <label htmlFor="">Product price</label>
                <input type="text" name='price'
                onChange={(e)=>{setPrice(e.target.value)}} value={price}
                />
                <label htmlFor="">Quantity</label>
                <input type="text" name='quantity'
                onChange={(e)=>{setQuantity(e.target.value)}} value={quantity}
                />
                <label htmlFor="">Discount</label>
                <input type="text" name='discount'
                onChange={(e)=>{setDiscount(e.target.value)}} value={discount}
                />
                <label htmlFor="">Image Url</label>
                <input type="text" name='imageUrl'
                onChange={(e)=>{setImageUrl(e.target.value)}} value={imageUrl}
                />
                <button>Add new product</button>
            </form>
        </div>
     );
}
 
export default ProductForm;