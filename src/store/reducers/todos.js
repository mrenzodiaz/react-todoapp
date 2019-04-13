const initial = [];

export default (state = initial, { type, payload }) => {
  switch (type) {
    case 'ADD_TODO':
      return [
        ...state,
        payload
      ];

    case 'UPDATE_TODO':
      const index = state.findIndex(item => item.id === payload.id);

      return [
        ...state.slice(0, index),
        payload,
        ...state.slice(index + 1)
      ];

    case 'DELETE_TODO':
      return state.filter(item => item !== payload);
      

    case 'RESET_TODOS':
      return initial;

    default:
      return state;
  }
};