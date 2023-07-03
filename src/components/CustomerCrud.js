import React from 'react';
import api from "../http-common";
//import { RouteComponentProps, withRouter } from 'react-router-dom';
import CustomerList from "./CustomerList";

const applyUpdateResult = (result) => (prevState) => ({
  customers: [...prevState.customers, ...result.customers],
  page: result.page,
});
const applySetResult = (result) => (prevState) => ({
  customers: result.customers,
  page: result.page,
});
const getTitleUrl = (value, page) => {
  if (value) {
    return `http://localhost:4232/api/customers?title=${value}&page=${page}&size=10`;
  } else {
    return `http://localhost:4232/api/customers?page=${page}&size=10`;
  }
}

class CustomerCrud extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      page: null,
    };
  }
  onInitialSearch = (e) => {
    e.preventDefault();

    const { value } = this.input;

    if (value === '') {
      return;
    }

    this.fetchCustomers(value, 0);
  }

  fetchCustomers = (value, page) =>
    fetch(getTitleUrl(value, page, 
      { method: 'GET', headers: {
        "Authorization": 'Basic ' + btoa("user:df542b7c-ae39-4120-bb8f-97271ecbd2cb"),
        "Content-type": "application/json"
      }}), )
      .then(response => response.json())
      .then(result => this.onSetResult(result, page));

  onSetResult = (result, page) =>
    page === 0
      ? this.setState(applySetResult(result))
      : this.setState(applyUpdateResult(result));

  render() {
    return (
      <div className="page">
        <div className="interactions">
          <form type="submit" onSubmit={this.onInitialSearch}>
            <input type="text" ref={node => this.input = node} />
            <button type="submit">Search</button>
          </form>
        </div>

        <List
          list={this.state.customers}
        />
      </div>
    );
  }

};
const List = ({ list }) =>
  <div className="list">
    {list.map(item => <div className="list-row" key={item.id}>
      <h3 >{item.title}</h3>
    </div>)}
  </div>

export default CustomerCrud;