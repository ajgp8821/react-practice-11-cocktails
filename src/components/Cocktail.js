import React, { Fragment, useContext, useState } from 'react';
import Spinner from './Spinner';
import Error from './Error';
import { ModalContext } from '../context/ModalContext';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 430,
      maxHeight: 626,
      overflowY: 'scroll',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Cocktail = ({ cocktail }) => {

    // Configuración del modal de MaterialUI
    const [ modalSyle ] = useState(getModalStyle);
    const [ open, setOpen ] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const { idDrink, strDrink, strDrinkThumb } = cocktail;

    // Extraer los valores de ModalContext
    const { cocktailInfo, setIdCocktail, errorModal, loadingModal, } = useContext(ModalContext);

    // Muestra y formatea los ingredientes
    const showCoctails = cocktailInfo => {
        let ingredients = [];
        for (let i=1; i< 16; i++) {
            if ( cocktailInfo[`strIngredient${i}`] !== null && cocktailInfo[`strIngredient${i}`] !== '') {
                ingredients.push(
                    <li key={i}>{cocktailInfo[`strIngredient${i}`]} {cocktailInfo[`strMeasure${i}`]}</li>
                )
            }
        }
        return ingredients;
    };

    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">
                    {strDrink}
                </h2>
                <img
                    className="card-img-top"
                    src={strDrinkThumb}
                    alt={`Imagen de ${strDrink}`}
                />
                <div className="body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            setIdCocktail(idDrink);
                            handleOpen();
                        }}
                    >
                        Ver Cocktail
                    </button>

                    <Modal
                        open={open}
                        onClose={() =>{
                            setIdCocktail(null);
                            handleClose();
                        }}
                    >
                        
                        <div style={modalSyle} className={classes.paper}>
                            { errorModal ?
                                <Error
                                    message="Cancion o Grupo no encontrados"
                                />
                            : loadingModal ?
                                <Spinner />
                            :
                                <Fragment>
                                    <h2>{cocktailInfo.strDrink}</h2>
                                    <h3 className="mt-4">Instrucciones</h3>
                                    <p>
                                        {cocktailInfo.strInstructions}
                                    </p>
                                    <img
                                        className="img-fluid my-4"
                                        src={cocktailInfo.strDrinkThumb}
                                        alt={cocktailInfo.strDrink}
                                    />
                                    <h3>Ingredientes y cantidades</h3>
                                    <ul>
                                        { showCoctails(cocktailInfo) }
                                    </ul>
                                </Fragment>
                            }
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
 
export default Cocktail;
