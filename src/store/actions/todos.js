export const ADD_TODO = (payload) => dispatch => {
  dispatch({
    payload,
    type: 'ADD_TODO'
  })
}

export const UPDATE_TODO = (payload) => dispatch => {
  dispatch({
    payload,
    type: 'UPDATE_TODO'
  })
}