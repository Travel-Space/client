"use client";

import HomeTitle from "./home/components/HomeTitle";
import PlanetList from "./home/components/PlanetList";
import SearchPlanet from "./home/components/SearchPlanet";
import * as H from "./home/page.styled";

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
