import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import EditMovieForm from './components/EditMovieForm';
import FavoriteMovieList from './components/FavoriteMovieList';
import AddMovieForm from './components/AddMovieForm'
import DeleteMovieModal from './components/DeleteMovieModal'

import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);


  useEffect(()=>{
    axios.get('http://localhost:5000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id)=> {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(res=>{
      // console.log(res);
      const newMovies = movies.filter(movie=>movie.id !== res.data);
      setMovies(newMovies);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  const addToFavorites = (id, movie) => {
    setFavoriteMovies([...favoriteMovies, movie]);
    
  }
  const handleCancel = () => {
    setShowModal(false);
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" ><img width="40px" alt="" src="./Lambda-Logo-Red.png"/> HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader/>
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies}/>
        
          <Switch>
            <Route path="/movies/edit/:id">
            {/* * [ ] First, we need to be able to navigate to the edit movie component. In App.js, add in the `<EditMovieForm> `component to the supplied edit route. */}
            {/* * [ ] Don't forget to make sure that your server data and your local state are in sync! Make any changes the edit route needed to give the edit form access to App's `setMovies` method. */}
              <EditMovieForm setMovies={setMovies}/>
            </Route >


            <Route path="/movies/add">
            <AddMovieForm setMovies={setMovies}/>
            </Route>

            <Route path="/movies/delete" component ={DeleteMovieModal}/>
            {/* {showModal && <DeleteMovieModal  deleteMovie = {deleteMovie} cancelFunction={handleCancel}/>} */}

            <Route path="/movies/:id">
              <Movie setShowModal ={setShowModal} addToFavorites={addToFavorites} deleteMovie = {deleteMovie}/>
            </Route>          

            <Route path="/movies">
              <MovieList movies={movies}/>
            </Route> 

            <Route path="/">
              <Redirect to="/movies"/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

