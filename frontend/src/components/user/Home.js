import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Slider from './Slider';
import UpcomingEvents from './UpcomingEvents';

 class Home extends Component {
  render() {
    return (
      <div> 
        <Slider/>
        <UpcomingEvents/>
      </div>
    )
  }
}

export default Home;
