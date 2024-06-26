// src/Time.js
import React, { Component } from 'react';

class Time extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: new Date().toLocaleTimeString()
        };
    }

    // Lifecycle method: componentDidMount
    componentDidMount() {
        this.timerID = setInterval(() => this.updateTime(), 1000);
    }

    // Lifecycle method: componentWillUnmount
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    updateTime() {
        this.setState({
            currentTime: new Date().toLocaleTimeString()
        });
    }

    render() {
        return (
            <>
                <h1 className='text-center m-0 p-0 text-3xl '>Current Time</h1>
                <p className='text-[16rem] m-0 p-0 font-bold'>{this.state.currentTime}</p>
            </>
        );
    }
}

export default Time;
