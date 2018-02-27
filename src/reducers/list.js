const listReducerDefaultState = [];

const listReducer = (state = listReducerDefaultState, action) => {
  switch (action.type) {

    case 'ADD_ITEM':
      return [
        ...state,
        action.item
      ]

    case 'REMOVE_ITEM':
      return state.filter(({id}) => id !== action.id);

    default:
      return state;
  }
}

export default listReducer;
