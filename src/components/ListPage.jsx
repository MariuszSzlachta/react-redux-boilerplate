import React from 'react';
import { connect } from 'react-redux';
import { addItem, removeItem } from '../actions/list';

class ListPage extends React.Component {
  constructor(props) {
    super(props);

    this.setValue = this.setValue.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);

    this.state = {
      value: ""
    }
  }

  setValue(value) {
    this.setState(() => ({
      value
    }));
  }

  addItem(e) {
    e.preventDefault();
    
    e.target.elements[0].value = "";

    this.props.dispatch(addItem(this.state.value));
    this.setState(() => ({
      value: ""
    }));
  };

  removeItem(id) {
    this.props.dispatch(removeItem(id));
  };

  render() {
    return (
      <div>
        <div className="jumbo">
          <h1 className="page-title">List</h1>
        </div>
        <div className="article">
          <h2 className="article-title">{this.props.list.length === 0 ? "Add Item to start" : "Here are Your items:"}</h2>
        </div>
        <ul className="list">
          {this.props.list.map((item, index) => (
            <li
              className="list__item"
              key={index}
            >
              <p className="list__item-value">{item.value}</p>
              <button
                className="button button--small"
                onClick={() => this.removeItem(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <form
          className="list__form"
          onSubmit={this.addItem}
        >
          <input
            onChange={(e) => this.setValue(e.target.value.trim())}
            type="text"
            id="item"
            className="list__input"
          />
          <button
            className="button"
            disabled={this.state.value.length === 0}
          >
            Add
          </button>
        </form>
      </div>
    )
  }
} 

const mapStateToProps = (state) => ({
  list: state.list
})

export default connect(mapStateToProps)(ListPage);
