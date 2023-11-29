const initialState = {
  page: 1,
  limit: 10,
};

export default function limitReducer(state = initialState, action) {
    const { type, payload } = action;
  switch (type) {
    case "increment":
      return { ...state, page: state.page + 1 };
    default:
      return { ...state };
  }
}
