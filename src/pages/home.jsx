import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import randomcolor from "randomcolor";
import { useWindowSize } from "../context/windowSize";

const areas = [
  { t: "home", c: randomcolor() },
  { t: "habilidades", c: randomcolor() },
  { t: "trabajos", c: randomcolor() },
  { t: "contacto", c: randomcolor() }
];

const reducer = (state, action) => {
  switch (action.type) {
    case "setWindowHeight": {
      return { ...state, windowHeight: action.windowHeight };
    }
    default: {
      return { ...state };
    }
  }
};

const initialState = {
  windowHeight: 0
};

const Home = () => {
  const { height } = useWindowSize();
  //let params = useParams();

  let areasWithScrollY = useMemo(() => {
    return areas.map((area, i) => {
      return {
        ...area,
        top: i * height,
        botton: i * height + height
      };
    });
  }, [height]);

  return (
    <>
      {console.log(areasWithScrollY)}
      {areas.map(({ t, c }, i) => {
        return (
          <div
            key={i}
            style={{ width: "100%", height: height, backgroundColor: c }}
          >
            <h2>{t}</h2>
          </div>
        );
      })}
    </>
  );
};

export default Home;
