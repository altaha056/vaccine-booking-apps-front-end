import { LOGOUT_ADMIN, UPDATE_PROFILE_ADMIN } from "../../constants/types/admins";

const initialState = null;

export default (state_admin = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_ADMIN:
      return { ...state_admin, ...action.payload };
    case LOGOUT_ADMIN:
      localStorage.removeItem("vac:token-admin");
      return null;
    default:
      return state_admin;
  }
};
