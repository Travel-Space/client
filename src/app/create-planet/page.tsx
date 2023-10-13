"use client";

import { useState } from "react";
import Radio from "./Radio";
import * as S from "./page.style";

export default function CreatePlanet() {
  //   const [planetImage, setPlanetImage] = useState(planets[0].value);
  const [planets, setPlanets] = useState([
    { value: "planet-1", src: "/assets/img/icons/planet-1.svg", selected: true },
    { value: "planet-2", src: "/assets/img/icons/planet-1.svg", selected: false },
    { value: "planet-3", src: "/assets/img/icons/planet-1.svg", selected: false },
    // { value: "planet-4", src: "/assets/img/icons/planet-1.svg", selected: false },
  ]);

  return (
    <S.Form>
      <S.Box>
        {/* {planetImage} */}
        <div>
          {planets.map(planet => (
            <Radio
              key={planet.value}
              id={planet.value}
              value={planet.value}
              name="planet"
              //   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlanetImage(e.target.value)}
              defaultChecked={planet.selected}
            >
              {planet.value}
              <img id={`${planet.value}_img`} src={planet.src} />
            </Radio>
          ))}
        </div>
        {/* <div>
          {planets.map(
            planetImg =>
              planetImage === planetImg.value && <img key={planetImg.value} id={planetImg.value} src={planetImg.src} />,
          )}
        </div> */}
        <div>
          <button
            type="button"
            // onClick={() => {
            //   const currentIndex = planets.findIndex(planet => planet.value === planetImage);
            //   if (currentIndex > 0) {
            //     setPlanetImage(planets[currentIndex - 1].value);
            //   } else {
            //     setPlanetImage(planets[planets.length - 1].value);
            //   }
            // }}
          >
            PREV
          </button>
          <button
            type="button"
            // onClick={() => {
            //   const currentIndex = planets.findIndex(planet => planet.value === planetImage);
            //   if (currentIndex < planets.length - 1) {
            //     setPlanetImage(planets[currentIndex + 1].value);
            //   } else {
            //     setPlanetImage(planets[0].value);
            //   }
            // }}
          >
            NEXT
          </button>
        </div>
      </S.Box>
      <S.Box>
        <S.WhiteBox>ddd</S.WhiteBox>
      </S.Box>
    </S.Form>
  );
}
