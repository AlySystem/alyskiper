import React, { Component, Fragment } from 'react'
import { Polyline } from 'react-native-maps'

class AnimatingPolylineComponent extends Component {
  state = {
     polylinePath: this.props.Direction
  };
  
  componentDidMount() {
     this.animatePolyline();
  }
  
  animatePolyline = () => {
     this.interval = setInterval(() => this.animatePolylineStart(), 70);
  };
  
  componentWillUnmount() {
     clearInterval(this.interval);
  }
  
  animatePolylineStart = () => {
     if (this.state.polylinePath.length < this.props.Direction.length) {
        const Direction = this.props.Direction;
        const polylinePath = [
           ...Direction.slice(0, this.state.polylinePath.length - 1)
        ];
        this.setState({polylinePath});
     } else {
        this.setState({polylinePath: []})
     }
  };
  
  render() {
    const DirectionRoutes = [...this.props.Direction].reverse();
     return (
        <Fragment>
           {
              (this.state.polylinePath.length > 0) && <Polyline
                 coordinates={this.state.polylinePath}
                //  strokeColor="#010119"
                 strokeColor="#03F9FC"
                 strokeWidth={4}
              />
           }
        </Fragment>
     )
  }
}

export default AnimatingPolylineComponent