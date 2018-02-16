import React from 'react';
import { connect } from 'react-redux';
import { incrementCounter, decrementCounter, resetCounter } from '../actions/counter';

const HomePage = (props) => (
  <div>
    <div className="jumbo">
      <h3 className="page-title">Home Page</h3>
    </div>
    <h1>{props.counter}</h1>
    <button
      onClick={() => props.dispatch(incrementCounter())}
    >
      Increment
    </button>
    <button
      onClick={() => props.dispatch(decrementCounter())}
    >
      Decrement
    </button>
    <button
      onClick={() => props.dispatch(resetCounter())}
    >
      Reset
    </button>
  </div>
);

const mapStateToProps = (state) => {
  return {
    counter: state.count
  }
}

export default connect(mapStateToProps)(HomePage);
