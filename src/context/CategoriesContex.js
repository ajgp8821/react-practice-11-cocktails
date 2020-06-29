import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Crear el context
export const CategoriesContex = createContext();

// Provider: de donde van a salir los datos, las funciones
const CategoriesProvider = (props) => {

    // Crear el state de Context
    const [ categories, setCategories ] = useState([]);
    const [ errorCategories, setErrorCategories ] = useState(false);
    const [ loadingCategories, setLoadingCategories ] = useState(false);

    // Ejecutar el llamado a la API
    useEffect(() =>{
        
        setErrorCategories(false);
        const getCategories = async () =>{
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

            // Mostrar el spinner
            setLoadingCategories(true);
            try{
                const categoriesUrl = await axios.get(url);

                setCategories(categoriesUrl.data.drinks);
                // console.log(categoriesUrl.data.drinks);
            }
            catch(error){
                setErrorCategories(true);
            }
            // ocultar el spinner
            setLoadingCategories(false);
        }
        getCategories();
    }, []);


    return (
        <CategoriesContex.Provider
            value={{
                categories,
                errorCategories,
                loadingCategories
            }}
        >
            {props.children}
        </CategoriesContex.Provider>
    );
}

export default CategoriesProvider;
