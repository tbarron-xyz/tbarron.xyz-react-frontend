import React from 'react';
import 'twitch-embed';

declare const Twitch;

// ripped from https://www.npmjs.com/package/twitch-embed

export default class TwitchVideoEmbed extends React.Component<{
    channel?: string,
    video?: string
}, {id: string}> {
    player: any;
    channel: boolean;
    constructor(props) {
        super(props);
        this.player = null;
        this.state = {
            id: null
        };
    }

    componentWillMount() {
        this.setId();
    }

    componentDidMount() {
        this.setPlayer();
    }

    componentDidUpdate() {
        this.setPlayer();
    }

    componentWillReceiveProps(nextProps) {
        this.setId();
        this.setPlayer();

        //can check for props and call player functions here
    }

    setId() {
        if (!this.state.id) {
            if (this.props.channel) {
                this.channel = true;
                this.setState({
                    id: `twitch-${this.props.channel}`
                });
            }
            if (this.props.video) {
                this.channel = false;
                this.setState({
                    id: `twitch-${this.props.video}`
                });
            }
        }
    }

    setPlayer() {
        if (!this.player) {
            const options: any = {};
            if (this.channel) {
                options.channel = this.props.channel;
            } else {
                options.video = this.props.video;
            }
            if (typeof window !== 'undefined' && (window as any).Twitch) {
                this.player = new Twitch.Player(this.state.id, options);
            }
        }
    }

    render() {
        return (
            <div id={this.state.id || ''} className="twitch-video-embed"></div>
        );
    }
}