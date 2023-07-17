import React,{createContext,useReducer,ReactNode} from 'react';

interface ProductsState {
    products: any[] | null;
}

interface ProductsAction {
    type:string,
    payload:any
}

interface ProductsContextType extends ProductsState{
    dispatch: React.Dispatch<ProductsAction>;
    state?: ProductsState;
}

export const ProductsContext = createContext<ProductsContextType>({
    products:null,
    dispatch: () => {},
    state: { products:null }
});

export const productReducer = (state: ProductsState | undefined, action: ProductsAction):ProductsState =>{
    switch(action.type){
        case 'SET_PRODUCTS':
            return{
                products: action.payload
            }
        case 'ADD_PRODUCT':
            return{
                products: [action.payload, ...(state?.products || [])]
            }
        default:
            return state || {products:[]}
    }
}

interface ProductsContextProviderProps{
    children: ReactNode;
}

export const ProductsContextProvider = ({children}:ProductsContextProviderProps) =>{
    const [state, dispatch] = useReducer(productReducer,{
        products: null
    })
    return (
        <ProductsContext.Provider value={{...state,dispatch}}>
            {children}
        </ProductsContext.Provider>
    )
}
