import React from 'react';
import ReactTwitchEmbedVideo from '../node_modules/react-twitch-embed-video/src/index';


export default class TwitchEmbedThatFollowsMouse extends React.PureComponent<{ title: string }, { left: number, top: number }> {
    componentDidMount() {
        document.addEventListener('mousemove', (event) => {
            this.setState({ left: event.pageX, top: event.pageY });
        });
    }

    render() {
        return <div style={{ position: 'absolute', left: this.state.left, top: this.state.top }}>
            <ReactTwitchEmbedVideo channel={this.props.title} />
        </div>;
    }
}