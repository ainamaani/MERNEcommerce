import React,{ReactNode, createContext, useEffect, useReducer} from 'react';


interface RecentlyViewedState{
    recentlyviewed: any[] | null;
}

interface RecentlyViewedAction{
    type:string,
    payload:any
}

interface RecentlyViewedContextType extends RecentlyViewedState {
    dispatch: React.Dispatch<RecentlyViewedAction>;
    state?: RecentlyViewedState;
}

export const RecentlyViewedContext = createContext<RecentlyViewedContextType>({
    recentlyviewed:null,
    dispatch: () => {},
    state: {recentlyviewed:null}
});

export const recentlyViewedReducer = (state : RecentlyViewedState | undefined,action : RecentlyViewedAction):RecentlyViewedState =>{
    switch(action.type){
        case 'ADD_RECENTLY_VIEWED':
            return{
                recentlyviewed: [action.payload, ...(state?.recentlyviewed || [])]
            }
        default:
            return state || {recentlyviewed:[]}

    }
}

interface RecentlyViewedContextProviderProps{
    children: ReactNode
}

const RecentlyViewedProvider = ({children}:RecentlyViewedContextProviderProps) => {
    const [state, dispatch] = useReducer(recentlyViewedReducer,{
        recentlyviewed:null
    });

    useEffect(()=>{
        const recentlyViewedString = localStorage.getItem("recentlyviewed");
        if(recentlyViewedString){
            const recentlyviewed = JSON.parse(recentlyViewedString);
            dispatch({type:'ADD_RECENTLY_VIEWED', payload:recentlyviewed})
        }
    },[])


    console.log("Recently viewed: ", state)
    return ( 
        <RecentlyViewedContext.Provider value={{ ...state, dispatch}}>
            {children}
        </RecentlyViewedContext.Provider>
     );
}
 
export default RecentlyViewedProvider;