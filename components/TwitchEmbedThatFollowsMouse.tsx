import React from 'react';
import TwitchRipped from './TwitchRipped';


export default class TwitchEmbedThatFollowsMouse extends React.PureComponent<{ title: string }, { left: number, top: number }> {
    offset = 5;
    constructor(props) {
        super(props)
        this.state = { left: 0, top: 0 };
    }

    componentDidMount() {
        document.addEventListener('mousemove', (event) => {
            this.setState({ left: event.pageX + this.offset, top: event.pageY + this.offset });
        });
    }

    render() {
        return <div style={{
            position: 'absolute',
            left: this.state.left,
            top: this.state.top,
            display: this.props.title ? 'block' : 'none'
        }}>
            {this.props.title ? <TwitchRipped channel={this.props.title} /> : null}
        </div>;
    }
}