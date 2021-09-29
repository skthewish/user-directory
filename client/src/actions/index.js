export const onUpdate = () => {
  return {
    type: "UPDATE",
  };
};
export const onSubmit = () => {
  return {
    type: "SUBMIT",
  };
};
export const onEdit = (id) => {
  return {
    type: "EDIT",
    payload: id,
  };
};
