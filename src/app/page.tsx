"use client";

import HomeTitle from "./home/HomeTitle";
import * as H from "./home/page.styled";
import PlanetList from "./home/PlanetList";
import SearchPlanet from "./home/SearchPlanet";

export default function Home() {
  return (
    <>
      <H.Wrapper>
        <HomeTitle />
        <H.Content>
          <SearchPlanet />
          <PlanetList />
        </H.Content>
      </H.Wrapper>
    </>
  );
}
