import { createAction, handleActions } from "redux-actions";
import { Map } from "immutable";

const SET = "route/SET";

export const set = createAction(SET, value => value);

const initialState = Map({
  path: "C"
});

export default handleActions(
  {
    [SET]: (state, action) => {
      return state.set("path", action.payload);
    }
  },
  initialState
);
