import { ACTION_FETCH, ADD_NOTE, REMOVE_NOTE, SHOW_LOADER } from "../types";

const handlers = {
  DEFAULT: (state) => state,
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [ADD_NOTE]: (state, { payload }) => ({
    ...state,
    notes: [...state.notes, ...payload],
  }),
  [ACTION_FETCH]: (state, { payload }) => ({
    ...state,
    notes: payload,
    loading: false,
  }),
  [REMOVE_NOTE]: (state, { payload }) => ({
    ...state,
    notes: state.notes.filter((note) => note.id !== payload),
  }),
};

export const FirebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
