import React from 'react';
import { connect } from 'react-redux';
import { incrementCounter, decrementCounter, resetCounter } from 'Actions';

const CounterPage = ({ count, dispatch }) => (
  <div>
    <div className="jumbo">
      <h1 className="page-title">Counter</h1>
    </div>
    <div className="article article--text-center">
      <h2 className="article-title">{count}</h2>
      <div className="buttons-box">
        <button
          className="button"
          onClick={() => dispatch(incrementCounter())}
        >
          Increment
        </button>
        <button
          className="button"
          onClick={() => dispatch(decrementCounter())}
        >
          Decrement
        </button>
        <button
          className="button"
          onClick={() => dispatch(resetCounter())}
        >
          Reset
        </button>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  count: state.counter.count,
});

export default connect(mapStateToProps)(CounterPage);
