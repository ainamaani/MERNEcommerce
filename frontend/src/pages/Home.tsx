import { Link } from "react-router-dom";

const Home = () => {
    return ( 
        <div className="home">
            <div className="homepage">
                <div className="homelinks">
                    <Link to={'/products'}>All Products</Link>
                    <Link to={'/categories'}>Product categories</Link>
                </div>
                <h1>Welcome to <span>QuickBuy</span></h1>
            </div>
            <div className="home-img">
                <img src="https://img.freepik.com/free-photo/shopping-purchase-order-discount-concept_53876-120434.jpg?size=626&ext=jpg&ga=GA1.1.770337933.1688404778&semt=ais" alt="home image" />
            </div>
        </div>
     );
}
 
export default Home;