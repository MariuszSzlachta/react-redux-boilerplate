import React from 'react';
import { connect } from 'react-redux';
import { incrementCounter, decrementCounter, resetCounter } from 'store/actions/counter';
import icon from 'assets/checked.svg';

export const Counter = ({
  counter, incrementCounter, decrementCounter, resetCounter,
}) => (
  <div>
    <h3>Counter: {counter.counter}</h3>
    <h3>Last action: {counter.lastAction ? counter.lastAction : 'None'}</h3>
    <button onClick={incrementCounter}>Increment</button>
    <button onClick={decrementCounter}>Decrement</button>
    <button onClick={resetCounter}>Reset</button>
    <svg viewBox={icon.viewBox} style={{ width: '2rem' }}>
      <use xlinkHref={icon} />
    </svg>
  </div>
);

const mapStateToProps = state => ({
  counter: state.counter,
});

const mapDispatchToProps = dispatch => ({
  incrementCounter: () => dispatch(incrementCounter()),
  decrementCounter: () => dispatch(decrementCounter()),
  resetCounter: () => dispatch(resetCounter()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
