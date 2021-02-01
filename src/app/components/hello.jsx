import React, { Component, PureComponent } from 'react';

class hello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date,
    };
  }
  componentDidUpdate(prevProps, prevState){
    console.log(prevProps, prevState);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    let obj = {};
    if(prevState.date !== nextProps.date){
      obj.date = nextProps.date;
    }
    return obj;
  }
  render() {
    let { date } = this.state;
    console.log('render');
    return <div>{date}</div>;
  }
}

export default hello;
