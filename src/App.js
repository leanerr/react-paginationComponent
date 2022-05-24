import React from 'react';
import axios from 'axios';
import { Loader, Pagination } from './components';
import { baseApiURL } from './config/env';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      listItems: [],
      page: 1,
      totalPages: 0,
      recordsPerPage: 4,
      enterpageno: ''
    }
  }

  componentDidMount() {
    this.loadListItem();
  }

  loadListItem () {
    this.setState({ showLoader: true });
    axios.get(`${baseApiURL}/v1/passenger?page=${this.state.page}&size=${this.state.recordsPerPage}`)
      .then(response => {
        const totalPages = Math.floor(response.data.totalPassengers / this.state.recordsPerPage) // Calculate total records
        this.setState({ showLoader: false, listItems: response.data.data, totalPages: totalPages })
      })
  }

  onChangeRecordsPerPage (event) {
    this.setState ({ recordsPerPage: parseInt(event.target.value) }, () => {
      this.loadListItem()
    })
  }

  gotoPage () {
    if (!isNaN(parseInt(this.state.enterpageno))) {
      this.setState({ page: parseInt(this.state.enterpageno) })
      this.loadListItem()
    }
  }

  onPageChanged (page) {
    this.setState ({ page: page }, () => {
      this.loadListItem()
    })
  }

  inputPageChange = (e) => {
    if (!isNaN(parseInt(e.target.value))) {
      this.setState({ enterpageno: parseInt(e.target.value) })
    }
  }

  render() {
    return (
      <div className="App" style={{padding : "5%"}}>
        <Loader loading={this.state.showLoader} />
        <h2>Pagination(navigator) Component with React.js</h2>
        <h3> Assignment 1</h3> 
        <ul className="flex-container">
        {
          this.state.listItems.map((item, index) => {
            return (<li key={index} className="flex-item">
              <img  src={item.airline[0] && item.airline[0].logo} alt={item.airline[0] && item.airline[0].name} />
              <h5>Passenger: {item.name}</h5>
              <h6>Airline: {item.airline[0] && item.airline[0].name}</h6>
              <h6>Country: {item.airline[0] && item.airline[0].country}</h6>
              <h6>website: {item.airline[0] && item.airline[0].website}</h6>
              <h6>established: {item.airline[0] && item.airline[0].established}</h6>

            </li>)
          })
        }
        {
          this.state.listItems.length === 0 ? 
          <li className="flex-item center">No Record Found</li>: <li />
        }
        </ul>
        <div style={{marginTop : "5%",marginLeft : "6%"}}>

        <ul className="showItems" >
          <li> Items in every Page : 
            <select onChange={ (e) => { this.onChangeRecordsPerPage(e) } }>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            
          </li>
          <li>
            Go to Page <input type="text" value={this.state.enterpageno} onChange={(e) => { this.inputPageChange(e)} } /><button type="button" style={{ background : "rgb(125, 111, 163)"}} onClick={ () => this.gotoPage() }>Go</button>
          </li>
        </ul>
      
        {
          this.state.listItems.length > 0 ?
          <Pagination 
          totalPages={this.state.totalPages}
           currentPage={this.state.page}
           maxVisibleButtons={ 3 } onPageChanged={ (e) => this.onPageChanged(e) }/> : 
          
           <div />
        }



      </div>
      </div>
    );
  }
}

export default App;
