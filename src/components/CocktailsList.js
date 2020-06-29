import React, { Fragment, useContext } from 'react';
import Spinner from './Spinner';
import Error from './Error';
import { CocktailsContext } from '../context/CocktailsContext';
import Cocktail from './Cocktail';

const CocktailsList = () => {

    const { cocktails, errorCategories, loadingCategories } = useContext(CocktailsContext);

    if (cocktails === undefined){
        return;
    }
    else if (Object.keys(cocktails).length === 0) {
        return (<Fragment></Fragment>);
    }

    return (
        <Fragment>
            <div className="col-12">
                { errorCategories ? <Error message="Error al obtener las bebidas" /> : null }
            </div>
            <div className="row mt-5">
                { loadingCategories ? <Spinner /> : null }
                {cocktails.map(cocktail => (
                    <Cocktail
                        key={cocktail.idDrink}
                        cocktail={cocktail}
                    />
                ))}
            </div>
        </Fragment>
        
    );
}
 
export default CocktailsList;
