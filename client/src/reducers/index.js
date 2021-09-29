const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SUBMIT":
      return { ...state, submit: !state.submit };
    case "UPDATE":
      return { ...state, isUpdate: false, id: null };
    case "EDIT":
      return { ...state, isUpdate: true, id: payload };

    default:
      return state;
  }
};

export default reducer;
