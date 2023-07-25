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


  //step two, the function called when the user is typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputQuery = e.target.value;
    setSearchQuery(inputQuery);
    setShowSuggestions(true); // Show suggestions when the user types

    // Filter the products for suggestions based on the input query
    const suggestions =
      inputQuery.trim() === ''
        ? []
        : products?.filter((product) => product.title.toLowerCase().startsWith(inputQuery.toLowerCase()));
    setSearchResults(suggestions);
  };
  const handleSuggestionClick = (product: SearchResults) => {
    setSearchQuery(product.title);
    setShowSuggestions(false);
    // Perform the search using the clicked suggestion's title
    fetchSearchResults(product.title);
  };

  const formatSuggestion = (suggestion: string, inputQuery: string) => {
    const startIndex = suggestion.toLowerCase().indexOf(inputQuery.toLowerCase());
    if (startIndex === -1) return suggestion; // No match, return the suggestion as it is

    const endIndex = startIndex + inputQuery.length;
    const boldText = suggestion.slice(startIndex, endIndex);
    const fadedText = suggestion.slice(endIndex);

    return (
      <>
        <span style={{ fontWeight: 'bold' }}>{boldText}</span>
        <span style={{ opacity: 0.5 }}>{fadedText}</span>
      </>
    );
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      // If the search query is empty, reset the search results and hide suggestions
      setSearchResults([]);
      setShowSuggestions(false);
    } else {
      // Filter the products for search results based on the input query
      const results = products?.filter((product) =>
        product.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
  
      // Update the search results and hide suggestions
      setSearchResults(results);
      setShowSuggestions(false);
    }
  };
  

  return (
    <div>
      <div className="search">
        <input  //step one. User types and as they type, the handleInputChange function is called.
          type="text"
          placeholder="Search product by title"
          value={searchQuery}
          onChange={handleInputChange} 
        />
        <button
          onClick={() => {
            handleSearch(); // Perform search when the user clicks the search button
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
            {formatSuggestion(product.title, searchQuery)}  
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
