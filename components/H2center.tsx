import React from 'react';

export class H2center extends React.PureComponent<{data}> {
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <h2> {this.props.data} </h2>
            </div>
        );
    }
}

export class H3center extends React.PureComponent<{data}> {
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '75%' }} > {this.props.data} </h2>
            </div>
        )
    }
}