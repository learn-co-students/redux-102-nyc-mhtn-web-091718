import { UPDATE_MESSAGE } from "../types";

export const generateUpdateMessageAction = payload => ({
  type: UPDATE_MESSAGE,
  payload
});
