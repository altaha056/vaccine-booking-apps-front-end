import { LOGOUT_ADMIN, UPDATE_PROFILE_ADMIN } from "../../constants/types/admins";

export const updateProfileAdmin = (profile_admin = {}) => {
  return {
    type: UPDATE_PROFILE_ADMIN,
    payload: profile_admin,
  };
};

export const logoutadmin = () => ({ type: LOGOUT_ADMIN });
