export const fetchArtistProfile = (token, artistId) => {
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const url = `https://api.spotify.com/v1/artists/${artistId}`;
  return fetch(url, options)
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => console.log(err));
};
