import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// Crear el context
export const ModalContext = createContext();

const ModalProvider = ( props ) => {

    // State del Provider
    const [ idCocktail, setIdCocktail ] = useState(null);
    const [ cocktailInfo, setCocktailInfo] = useState({});
    
    const [ errorModal, setErrorModal ] = useState(false);
    const [ loadingModal, setLoadingModal ] = useState(false);

    // Al tener receta se consulta la API
    useEffect(() => {
        setErrorModal(false);
        const getCocktail = async () => {
            if (!idCocktail) return;
            
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idCocktail}`;
            
            // Mostrar el spinner
            setLoadingModal(true);
            try{
                const result = await axios.get(url);

                // console.log(result.data.drinks[0]);
                setCocktailInfo(result.data.drinks[0]);
            }
            catch(error){
                setErrorModal(true);
            }
            // ocultar el spinner
            setLoadingModal(false);
        };
        getCocktail();

        return () => {
            setCocktailInfo({});
        };
    }, [idCocktail])

    return (
        <ModalContext.Provider
            value={{
                cocktailInfo,
                errorModal,
                loadingModal,
                setIdCocktail,
                setCocktailInfo,
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}
 
export default ModalProvider;