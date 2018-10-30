import React from 'react';
import TwitchRipped from './TwitchRipped';


export default class TwitchEmbedThatFollowsMouse extends React.PureComponent<{ title: string }, { left: number, top: number }> {
    constructor(props) {
        super(props)
        this.state = { left: 0, top: 0 };
    }

    componentDidMount() {
        document.addEventListener('mousemove', (event) => {
            this.setState({ left: event.pageX, top: event.pageY });
        });
    }

    render() {
        return <div style={{ position: 'absolute', left: this.state.left, top: this.state.top }}>
            <TwitchRipped channel={this.props.title} />
        </div>;
    }
}