import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ImageSlider from "../ImageSlider";
import "./Home.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  GetNowPlaying,
  GetPopularMovies,
  GetTopRatedMovies,
  GetUpcomingMovies,
} from "../../store/movies/apiActions";
// import CardList from "../CardList";

const Home = () => {
  const [slides, setSlides] = useState([]);
  const [apiDataLoaded, setApiDataLoaded] = useState(false);
  const [apiPopularLoaded, setApiPopularLoaded] = useState(false);
  const [apiTopRatedLoaded, setApiTopRatedLoaded] = useState(false);
  const [apiUpcomingLoaded, setApiUpcomingLoaded] = useState(false);
  const slidesArr = [];
  const [isSuccessCall, setIsSuccessCall] = useState(false);
  const nowplayingData = useSelector((state) => state.nowPLaying.playing);
  const popularMoviesData = useSelector((state) => state.popularMovies.playing);
  const topRatedMoviesData = useSelector(
    (state) => state.topRatedMovies.playing
  );
  const upcomingMoviesData = useSelector(
    (state) => state.upcomingMovies.playing
  );
  const dispatch = useDispatch();

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/discover/movie",
    params: {
      include_adult: "false",
      include_video: "false",
      language: "en-US",
      page: "1",
      sort_by: "popularity.desc",
    },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjN2Q1N2FlY2NlMmRiZjhlN2UwMDVkNzliMDNjY2UwNCIsInN1YiI6IjY0NGUxYWQ3OWFmZmMwMDJmYmRmZGMwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dx7oZt0jO5BJK4FmCJK71irizs-3Lshv-x11ts6H55A",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        response.data.results.map((item, index) => {
          if (index < 8) {
            slidesArr.push(item);
          }
        });
        setSlides(slidesArr);
        setIsSuccessCall(true);
      })
      .catch(function (error) {
        console.error("THIS IS THE ERROR...",error);
      });

    // GetNowPlaying API
    dispatch(GetNowPlaying())
      .then(() => {
        setApiDataLoaded(true); // Set the state to true when data is loaded
      })
      .catch((error) => {
        console.log("Unable to load data", error);
      });

    // GetPopularMovies API Call
    dispatch(GetPopularMovies())
      .then(() => {
        setApiPopularLoaded(true); // Set the state to true when data is loaded
      })
      .catch((error) => {
        console.log("Unable to load data", error);
      });
    // GetTopRatedMovies API Call
    dispatch(GetTopRatedMovies())
      .then(() => {
        setApiTopRatedLoaded(true); // Set the state to true when data is loaded
      })
      .catch((error) => {
        console.log("Unable to load data", error);
      });
    // GetUpcomingMovies API Call
    dispatch(GetUpcomingMovies())
      .then(() => {
        setApiUpcomingLoaded(true); // Set the state to true when data is loaded
      })
      .catch((error) => {
        console.log("Unable to load data", error);
      });
    // console.log("Home>>DATA >>>>>", nowplayingData);
  }, [dispatch]);

  const containerStyles = {
    width: "100%",
    height: "80vh",
    margin: "0 auto",
  };
  // console.log("HOME SECTION >>", nowplayingData.data);

  return (
    <div className="home">
      <div style={containerStyles}>
        {isSuccessCall ? <ImageSlider slides={slides} /> : null}
      </div>
      <main id="main" style={{ ...containerStyles, height: "max-content" }}>
{/*         
        {
          apiUpcomingLoaded ? (<CardList data={upcomingMoviesData.data}title={"Popular Movies"}/>) : ( <div>Loading...</div>)
        }
        
        {
          apiDataLoaded ? (<CardList data={nowplayingData.data} title={"Now Playing"}/>) : ( <div>Loading...</div>)
        }
        
        {
          apiPopularLoaded ? (<CardList data={popularMoviesData.data}title={"Popular"}/>) : ( <div>Loading...</div>)
        }
        {
          apiTopRatedLoaded ? (<CardList data={topRatedMoviesData.data}title={"Top Rated"}/>) : ( <div>Loading...</div>)
        } */}
      </main>
    </div>
  );
};

export default Home;
