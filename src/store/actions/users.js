import { LOGOUT, UPDATE_PROFILE } from "../../constants/types/users";

export const updateProfile = (profile = {}) => {
  return {
    type: UPDATE_PROFILE,
    payload: profile,
  };
};

export const logout = () => ({ type: LOGOUT });
