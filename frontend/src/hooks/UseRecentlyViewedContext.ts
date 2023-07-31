import React,{useContext} from 'react';
import { RecentlyViewedContext } from '../contexts/RecentlyViewed';

const useRecentlyViewedContext = () => {
    const context = useContext(RecentlyViewedContext);
    if(!context){
        throw new Error ("You cannot access this context");
    }

    return context;
}
 
export default useRecentlyViewedContext;