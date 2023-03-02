import { HideAlert, ShowAlert } from "../types";

const handlers = {
  default: (state) => state,
  [ShowAlert]: (state, { payload }) => ({ ...payload, visible: true }),
  [HideAlert]: (state) => ({ ...state, visible: false }),
};

const AlertReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.default;
  return handle(state, action);
};

export default AlertReducer;
