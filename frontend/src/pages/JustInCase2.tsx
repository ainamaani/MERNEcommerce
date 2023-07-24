import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import useProductsContext from '../hooks/UseProductsContext';
import ProductsDetails from './ProductsDetails';

interface SearchResults {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  quantity: string;
  imageUrl: string;
  discount: string;
}

const Products = (): JSX.Element => {
  const { products, dispatch } = useProductsContext();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResults[] | undefined>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const latestSearchQueryRef = useRef<string>('');

  const fetchSearchResults = async (query: string) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/products?search=${query}`);
      const data = response.data;
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    latestSearchQueryRef.current = searchQuery;
  }, [searchQuery]);

  useEffect(() => {
    // Perform the search only if the searchQuery is not empty
    if (searchQuery) {
      // Delay the search by 300ms using debounce to prevent excessive API calls while typing
      const debounceSearch = setTimeout(() => {
        if (searchQuery === latestSearchQueryRef.current) {
          fetchSearchResults(searchQuery);
        }
      }, 345600000);

      // Clear the timeout on cleanup to prevent redundant searches
      return () => clearTimeout(debounceSearch);
    } else {
      // Reset the search results if the searchQuery is empty
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/products/');
        const data = response.data;
        if (response.status === 200) {
          dispatch({ type: 'SET_PRODUCTS', payload: data });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputQuery = e.target.value;
    setSearchQuery(inputQuery);
    setShowSuggestions(true); // Show suggestions when the user types
  
    // Filter the products for suggestions based on the input query
    const suggestions = inputQuery.trim() === '' ? [] : products?.filter((product) =>
      product.title.toLowerCase().startsWith(inputQuery.toLowerCase())
    );
    setSearchResults(suggestions);
  };
  

  const handleSuggestionClick = (product: SearchResults) => {
    setSearchQuery(product.title);
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    if (latestSearchQueryRef.current.trim() === '') {
      // If the search query is empty, reset the search results and hide suggestions
      setSearchResults([]);
      setShowSuggestions(false);
    } else {
      // Show suggestions only when the user clicks on the search button
      setShowSuggestions(true);
    }
  };
  
  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="Search product by title"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button
          onClick={() => {
            handleSearch(); // Show suggestions when the user clicks the search button
          }}
        >
          Search product
        </button>
      </div>
      <div className={`suggestions ${showSuggestions ? 'show' : ''}`}>
        {searchResults?.map((product) => (
            <button
            key={product._id}
            className="suggestion-item"
            onClick={() => handleSuggestionClick(product)}
            >
            {product.title}
            </button>
        ))}
        </div>




      <div className="products">
        {searchResults ? (
          searchResults.length > 0 ? (
            searchResults.map((product) => (
              <ProductsDetails key={product._id} product={product} />
            ))
          ) : (
            products &&
            products.map((product) => <ProductsDetails key={product._id} product={product} />)
          )
        ) : (
          <h4>Loading.....</h4>
        )}
      </div>
    </div>
  );
};

export default Products;
