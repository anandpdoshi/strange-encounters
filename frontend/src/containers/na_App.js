import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header form './Header';
import Home from './Home';

// import logo from '../images/logo.svg';
// import './App.css';

const mapStateToProps = state => ({
    appName: state.appName
});


class App extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { };
    // }
    //
    // componentWillMount() {
    //     store.subscribe(() => this.setState( store.getState() ));
    // }

    // componentDidMount() {
    //     return fetch('/api')
    //         .then((response) => response.text())
    //         .then((responseText) => {
    //             console.log(responseText);
    //         })
    // }

    render() {
        return (
            <div>
                <Header appName={this.props.appName} />
                {this.props.children}
            </div>


            // <div className="App">
            //     <header className="App-header">
            //         <img src={logo} className="App-logo" alt="logo" />
            //         <h1 className="App-title">Welcome to React</h1>
            //     </header>
            //     <p className="App-intro">
            //         To get started, edit <code>src/App.js</code> and save to reload.
            //     </p>
            // </div>
        );
    }
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, () => ({}))(App);
