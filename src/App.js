import React from 'react';
import Header from './components/Header';
import Form from './components/Form';
import CocktailsList from './components/CocktailsList';

import CategoriesProvider from './context/CategoriesContex'
import CocktailsProvider from './context/CocktailsContext'
import ModalProvider from './context/ModalContext'

function App() {
  return (
    <CategoriesProvider>
      <CocktailsProvider>
        <ModalProvider>
            <Header />

            <div className="container mt-5">
              <div className="row">
                <Form />
              </div>
              <CocktailsList />
            </div>
        </ModalProvider>
      </CocktailsProvider>
    </CategoriesProvider>
  );
}

export default App;
