import { createContext, useContext, useReducer } from "react";
import { useMediaQuery } from "react-responsive";
import reducer from "./reducers";

const MainContext = createContext();
const { Provider } = MainContext;

const MainProvider = ({ value = [], ...props }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1000px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1000px)" });

  const initialState = {
    isMobile: isMobile,
    isTablet: isTablet,
    isDesktop: isDesktop,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={[state, dispatch]} {...props} />;
};

const useMainContext = () => {
  return useContext(MainContext);
};

export { MainProvider, useMainContext };
