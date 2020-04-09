import React, { useEffect } from "react";
import GlobalStyles from "../GlobalStyles/GlobalStyles";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ArtistRoute from "../ArtistRoute";
import {
  requestAccessToken,
  receiveAccessTokenError,
  receiveAccessToken,
} from "../../actions";

const DEFAULT_ARTIST_ID = "6mMCSCuTbGU6kNr4303LwH";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestAccessToken());

    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((res) => {
        dispatch(receiveAccessToken(res.access_token));
      })
      .catch((err) => {
        console.log(err);
        dispatch(receiveAccessTokenError());
      });
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/artists/:artistId">
          <ArtistRoute />
        </Route>
        <Route path="/">
          <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
        </Route>
      </Switch>
      <GlobalStyles />
    </Router>
  );
};

export default App;
