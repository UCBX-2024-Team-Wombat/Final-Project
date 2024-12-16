import { EXAMPLE_REDUCER_ACTION } from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case EXAMPLE_REDUCER_ACTION:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
