const incrementCounter = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT_COUNTER',
  incrementBy
});

const decrementCounter = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT_COUNTER',
  decrementBy
});

const resetCounter = () => ({
  type: 'RESET_COUNTER'
});

export { incrementCounter, decrementCounter, resetCounter };
