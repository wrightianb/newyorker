import React, { Component } from 'react';
import Cartoon from './components/Cartoon';
import Caption from './components/Caption';
import Next from './components/Next';

class App extends Component {
  state = { cartoon: '' }

  componentWillMount() {
    this.fetchCartoon();
  }

  fetchCartoon = () => {
    fetch('http://www.newyorker.com/cartoons/random/randomAPI')
      .then( response => response.json())
      .then( json => {
        const { src } = json[0];
        this.setState({ cartoon: src });
      })
      .catch( e => console.log(e));
  }

  isLoading(cartoon){
    return cartoon === '';
  }

  render() {
    const { cartoon } = this.state;
    const { isLoading, fetchCartoon } = this;
    return (
      <div className="flexbox-container">
        <h4>The Universal New Yorker Cartoon Caption</h4>
        { isLoading(cartoon) ? null :
          <div className="cartoon-container">
            <Cartoon cartoon={cartoon}/>
            <Caption />
            <Next nextCartoon={fetchCartoon}/>
          </div>
        }
      </div>
    );
  }
}

export default App;
