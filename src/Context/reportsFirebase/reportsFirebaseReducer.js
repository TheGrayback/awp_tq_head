import { ACTION_FETCH, ADD_DATA, REMOVE_DATA, SHOW_LOADER } from "../types";

const handlers = {
  DEFAULT: (state) => state,
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [ADD_DATA]: (state, { payload }) => ({
    ...state,
    data: [...state.data, ...payload],
  }),
  [ACTION_FETCH]: (state, { payload }) => ({
    ...state,
    data: payload,
    loading: false,
  }),
  [REMOVE_DATA]: (state, { payload }) => ({
    ...state,
    data: state.data.filter((data) => data.id !== payload),
  }),
};

export const ReportsFirebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
