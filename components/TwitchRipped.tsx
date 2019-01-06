import React from 'react';

declare const Twitch;

// ripped from https://www.npmjs.com/package/twitch-embed

export default class TwitchVideoEmbed extends React.Component<{
    channel?: string,
    video?: string
}, { id: string }> {
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
        const script = document.createElement("script");
        const url = "https://player.twitch.tv/js/embed/v1.js";
        const url2 = "https://embed.twitch.tv/embed/v1.js";

        const script2 = document.createElement("script");
        script2.src = url2;
        script2.async = true;

        script.src = url;
        script.async = true;

        document.body.appendChild(script2);
        document.body.appendChild(script);
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
            const options: any = {
                height: 300,
                width: 400
            };
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