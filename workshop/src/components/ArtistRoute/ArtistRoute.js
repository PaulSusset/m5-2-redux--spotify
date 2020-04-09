import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import styled from "styled-components";
import {
  requestArtistProfile,
  receiveArtistProfile,
  receiveArtistProfileError,
} from "../../actions";

const ArtistRoute = () => {
  const dispatch = useDispatch();
  const { artistId } = useParams();
  const accessToken = useSelector((state) => state.auth.token);
  const artist = useSelector((state) => state.artists.currentArtist);

  console.log(artist);
  useEffect(() => {
    let artist;
    if (!accessToken) return;
    dispatch(requestArtistProfile());
    const func = async () => {
      artist = await fetchArtistProfile(accessToken, artistId).catch((err) => {
        console.log(err);
        dispatch(receiveArtistProfileError());
      });
      dispatch(receiveArtistProfile(artist));
      console.log(artist);
    };
    func();
  }, [accessToken]);

  const followerCount = () => {
    if (!artist) return;
    let num;
    let variable = artist.profile.followers.total.toString();
    if (variable.length < 4) {
      num = variable;
    } else if (variable.length < 7) {
      num = `${variable.slice(0, -3)}K`;
    } else if (variable.length > 6) {
      num = `${variable.slice(0, -6)}M`;
    }
    return num;
  };
  useEffect(() => {
    followerCount();
  }, [artist]);
  return (
    <>
      {artist && (
        <Wrapper>
          <NameBox>
            <MainImg src={artist.profile.images[0].url} />
            <Name>{artist.profile.name}</Name>
          </NameBox>
          <p>
            <Pink>{followerCount()} </Pink>followers
          </p>
          <h2>tags</h2>
          <TagBox>
            <Tags>{artist.profile.genres[0]}</Tags>
            <Tags>{artist.profile.genres[1]}</Tags>
          </TagBox>
        </Wrapper>
      )}
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #0b0f14;
  color: #ffffff;
  position: relative;
  width: 375px;
  height: 812px;
`;
const MainImg = styled.img`
  /* position: absolute; */
  width: 175px;
  height: 175px;
  left: 104px;
  top: 59px;

  background: url(image.png);
  border-radius: 190.5px;
`;
const Pink = styled.span`
  color: #ff4fd8;
  font-weight: bold;
`;
const Name = styled.h1`
  position: absolute;
  bottom: 0;
  font-weight: bold;
  margin: 0;
`;
const Tags = styled.p`
  padding: 10px;
  background: rgba(75, 75, 75, 0.4);
  border-radius: 6px;
  font-size: 12px;
  font-weight: bolder;
`;
const TagBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
`;
const NameBox = styled.div`
  position: relative;
  width: fit-content;
  padding-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default ArtistRoute;
