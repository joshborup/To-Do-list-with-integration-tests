import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    toDoList: [],
    name:'',
    description: ''
  }

  componentDidMount(){
    this.getMyList();
  }

  getMyList = () => {
    axios.get('/api/to_do').then(response => {
      this.setState({
        toDoList: response.data
      })
    })
  }

  addToList = () => {
    axios.post('/api/to_do', {name: this.state.name, description: this.state.description}).then(() => {
      this.getMyList()
      this.setState({
        name: '',
        description: ''
      })
    })
  }

  render() {
    const { toDoList } = this.state;

    const myToDoList = toDoList.map(item => {
      return <div className='item' key={item.id}>
              <h1>{item.name}</h1>
              <p>{item.description ? item.description : 'No Description here!'}</p>
            </div>
    })
    return (
      <div className="App">
        <div onKeyPress={(e) => e.key === "Enter" ? this.addToList() : null} className='inputs-container'>
            <input type='text' name='name' value={this.state.name} onChange={(e) => this.setState({[e.target.name]: e.target.value})}/>
            <textarea type='text' name='description' value={this.state.description} onChange={(e) => this.setState({[e.target.name]: e.target.value})}/>
            <button onClick={this.addToList}>Submit</button>
        </div>
        <div className='item-list-container'>
          {myToDoList}
        </div>
      </div>
    );
  }
}

export default App;
