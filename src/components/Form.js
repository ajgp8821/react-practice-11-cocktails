import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import Error from './Error';
import { CategoriesContex } from '../context/CategoriesContex';
import { CocktailsContext } from '../context/CocktailsContext';

const Form = () => {

    const [ search, setSearch ] = useState({
        cocktail: '',
        category: '',
    });
    const [ errorForm, setErrorForm ] = useState(false);

    const { cocktail, category } = search;

    const { categories, errorCategories, loadingCategories } = useContext(CategoriesContex);
    const { setSearchCocktail, setConsult } = useContext(CocktailsContext);

    // Función para leer los contenidos
    const getDataCocktail = e => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value,
        });

    };

    const searchInformation = e => {
        e.preventDefault();

        if (cocktail.trim() === '' || category.trim() === '') {
            setErrorForm(true);
            return;
        }
        setErrorForm(false);

        setSearchCocktail(search);
        setConsult(true);

    };

    return (
        <form
            className="col-12"
            onSubmit={searchInformation}
        >
            <fieldset className="text-center">
                <legend>Busca bebidas por Categoría o Ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input
                        name="cocktail"
                        className="form-control"
                        type="text"
                        placeholder="Buscar por ingrediente"
                        onChange={getDataCocktail}
                        value={cocktail}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-control"
                        name="category"
                        onChange={getDataCocktail}
                        value={category}
                    >
                        <option value="">-- Selecciona Categoría</option>
                        {categories.map( categ => (
                            <option
                                key={categ.strCategory}
                                value={categ.strCategory}
                            >{categ.strCategory}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buscar Bebidas"
                    />
                </div>
            </div>
            { errorForm ? <Error message="Ambos campos son obligatorios" /> : null }
            { errorCategories ? <Error message="Error al obtener las categorías" /> : null }
            { loadingCategories ? <Spinner /> : null }
        </form>
    );
}

Form.propTypes = {
    // test: PropTypes.string.isRequired,
}
 
export default Form;
