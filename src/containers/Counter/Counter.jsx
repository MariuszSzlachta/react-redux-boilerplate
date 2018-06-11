import React from 'react';
import { connect } from 'react-redux';
import { incrementCounter, decrementCounter, resetCounter } from 'store/actions/counter';
import icon from 'assets/checked.svg';

export const Counter = props => (
  <div>
    <h2>Counter: {props.counter.counter}</h2>
    <h2>Last action: {props.counter.lastAction}</h2>
    <button onClick={props.incrementCounter}>Increment</button>
    <button onClick={props.decrementCounter}>Decrement</button>
    <button onClick={props.resetCounter}>Reset</button>
    <svg viewBox={icon.viewBox}>
      <use xlinkHref={icon} />
    </svg>`
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
