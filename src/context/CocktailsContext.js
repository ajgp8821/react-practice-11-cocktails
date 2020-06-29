import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CocktailsContext = createContext();

const CocktailsProvider = ( props ) => {

    const [ cocktails, setCocktails ] = useState([]);
    const [ searchCocktail, setSearchCocktail ] = useState({
        cocktail: '',
        category: '',
    });
    const [ consult, setConsult ] = useState(false);
    const [ errorCategories, setErrorCategories ] = useState(false);
    const [ loadingCategories, setLoadingCategories ] = useState(false);

    const { cocktail, category } = searchCocktail;

    useEffect(() => {

        setErrorCategories(false);
        if (consult){
            const getCoctails = async () =>{
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${cocktail}&c=${category}`;
                console.log(url);
                // Mostrar el spinner
                setLoadingCategories(true);
                try{
                    const result = await axios.get(url);
                    // console.log(result.data.drinks);
                    setCocktails(result.data.drinks);
                }
                catch(error){
                    setErrorCategories(true);
                }
                // ocultar el spinner
                setLoadingCategories(false);
            };
            getCoctails();
            return () => {
                setCocktails({});
            };
        }
    }, [searchCocktail, cocktail, category, consult]);
    
    return (
        <CocktailsContext.Provider
            value={{
                cocktails,
                errorCategories,
                loadingCategories,
                setSearchCocktail,
                setConsult,
            }}
        >
            {props.children}
        </CocktailsContext.Provider>
    );
}
 
export default CocktailsProvider;
