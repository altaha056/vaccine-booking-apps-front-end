import { LOGOUT, UPDATE_PROFILE } from "../../constants/types/users";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return { ...state, ...action.payload };
    case LOGOUT:
      localStorage.removeItem("vac:token");
      return null;
    default:
      return state;
  }
};
