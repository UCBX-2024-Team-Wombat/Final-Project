import { createContext, useContext, useReducer } from "react";
import reducer from "./reducers";

const MainContext = createContext();
const { Provider } = MainContext;

const MainProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {});

  return <Provider value={[state, dispatch]} {...props} />;
};

const useMainContext = () => {
  return useContext(MainContext);
};

export { MainProvider, useMainContext };
