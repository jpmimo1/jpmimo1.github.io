import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  width: 0,
  height: 0,
  scrollX: 0,
  scrollY: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setSize": {
      const { width, height } = action;
      return { ...state, width, height };
    }
    case "setScroll": {
      const { scrollX, scrollY } = action;
      return { ...state, scrollX, scrollY };
    }
    default: {
      return { ...state };
    }
  }
};

const WindowSizeContext = createContext();

const useWindowSize = () => {
  return useContext(WindowSizeContext);
};

const WindowSizeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const changeSizeWindow = () => {
    dispatch({
      type: "setSize",
      width: window.innerWidth,
      height: window.innerHeight
    });
    let timer = 0;
    window.onresize = () => {
      const {
        scrollX,
        scrollY,
        innerWidth: width,
        innerHeight: height
      } = window;
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log("ejecutó resize");
        dispatch({ type: "setScroll", scrollX, scrollY });
        dispatch({ type: "setSize", width, height });
      }, 200);
    };
  };

  const changeScrollWindow = () => {
    dispatch({
      type: "setScroll",
      scrollX: window.scrollX,
      scrollY: window.scrollY
    });
    let timer = 0;
    window.onscroll = () => {
      const {
        scrollX,
        scrollY,
        innerWidth: width,
        innerHeight: height
      } = window;
      clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch({ type: "setScroll", scrollX, scrollY });
        dispatch({ type: "setSize", width, height });
      }, 200);
    };
  };

  useEffect(() => {
    changeSizeWindow();
    changeScrollWindow();
  }, []);

  return (
    <WindowSizeContext.Provider value={state}>
      {children}
    </WindowSizeContext.Provider>
  );
};

export { useWindowSize, WindowSizeProvider };
