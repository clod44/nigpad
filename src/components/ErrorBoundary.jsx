import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor (props) {
        super(props);
        this.state = { hasError: false, errorMessage: '', errorInfo: '' };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, errorMessage: error.message };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo: errorInfo.componentStack });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', backgroundColor: 'lightcoral', color: 'white', overflow: 'auto' }}>
                    <h1>Something went wrong.</h1>
                    <p>Error: {this.state.errorMessage}</p>
                    <pre>{this.state.errorInfo}</pre>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
