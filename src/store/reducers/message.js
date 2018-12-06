import { UPDATE_MESSAGE } from "../types";

const message = (state = "Hi from Redux and Ciao", action) => {
  switch (action.type) {
    case UPDATE_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};

export default message;
