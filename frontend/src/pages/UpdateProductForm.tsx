import React,{useEffect,useState,ChangeEvent} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface InitialDetails{
    _id:string,
    title:string,
    description:string,
    category:string,
    price:string,
    quantity:string,
    imageUrl:string,
    discount:string
}

const UpdateProductForm = ():JSX.Element => {
    const [title,setTitle] = useState<string>('');
    const [description,setDescription] = useState<string>('');
    const [category,setCategory] = useState<string>('')
    const [price,setPrice] = useState<string>('');
    const [quantity,setQuantity] = useState<string>('');
    const [imageUrl,setImageUrl] = useState<string>('');
    const [discount,setDiscount] = useState<string>();
    const [initialdetails,setInitialDetails] = useState<InitialDetails>({
        _id: '',
        title: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
        imageUrl: '',
        discount:''
    });

    const {id} = useParams();

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

    useEffect(()=>{
        const fetchInitialDetails = async() =>{
            try {
                const initialdata = await axios.get(`http://localhost:9000/api/products/${id}`);
                const data = initialdata.data;
                if(initialdata.status === 200){
                    setInitialDetails(data);
                    setTitle(data.title);
                    setDescription(data.category);
                    setCategory(data.category);
                    setPrice(data.price);
                    setQuantity(data.quantity);
                    setDiscount(data.discount);
                    setImageUrl(data.imageUrl); 
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchInitialDetails()
    },[id]);

    const handleUpdateProduct = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        interface ChangedFields{
            _id?:string,
            title?:string,
            description?:string,
            category?:string,
            price?:string,
            quantity?:string,
            imageUrl?:string,
            discount?:string
        }

        const changedFields : ChangedFields = {} ;
        if(title !== initialdetails.title){
            changedFields.title = title;
        }
        if(description !== initialdetails.description){
            changedFields.description = description;
        }
        if(category !== initialdetails.category){
            changedFields.category = category;
        }
        if(price !== initialdetails.price){
            changedFields.price = price;
        }
        if(quantity !== initialdetails.quantity){
            changedFields.quantity = quantity;
        }
        if(imageUrl !== initialdetails.imageUrl){
            changedFields.imageUrl = imageUrl;
        }
        if(discount !== initialdetails.discount){
            changedFields.discount = discount;
        }

        const updated = await axios.patch(`http://localhost:9000/api/products/${id}`,
                        JSON.stringify(changedFields),
                        {
                            headers:{
                                'Content-Type':'application/json'
                            }
                        }
        )
        if(updated.status === 200){
            setInitialDetails({
                _id:'',
                title:'',
                description:'',
                category:'',
                price:'',
                quantity:'',
                imageUrl:'',
                discount:''
            });
            setTitle('');
            setDescription('');
            setCategory('');
            setPrice('');
            setQuantity('');
            setImageUrl('');
            setDiscount('');
            toast.success('Product updated successfully', {
                position: 'top-right'
              });
        }

    }
    return ( 
        <div className='content'>
            <form onSubmit={handleUpdateProduct}>
                <h4>Update product form</h4>
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
 
export default UpdateProductForm;