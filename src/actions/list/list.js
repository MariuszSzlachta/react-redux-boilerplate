import uuid from 'uuid';

const addItem = value => ({
  type: 'ADD_ITEM',
  item: {
    id: uuid(),
    value,
  },
});

const removeItem = (id = 0) => ({
  type: 'REMOVE_ITEM',
  id,
});

export { addItem, removeItem };
