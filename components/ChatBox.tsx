import React from 'react';

export class InputBox extends React.PureComponent<{value, socket: any}, {value: any}> {
	getInitialState() {
		return { value: '' };
	}

	render() {
		return (
			<input type="text" value={this.state.value} onChange={this.handle_change}
				onKeyDown={this.handle_keydown} />
		);
	}

	handle_keydown(event) {
		if (event.keyCode == 13) {
			this.handle_submit(event);
		}
	}

	handle_change(event) {
		this.setState({ value: event.target.value.substr(0, 140) });
	}

	handle_submit(event) {
		event.preventDefault();
		this.props.socket.send(JSON.stringify({ type: 'chat_message', message: this.state.value }));
		this.setState({value: ''});
		event.target.value = '';
	}
}

export class ChatBox extends React.PureComponent {
	render() {
		return (<div></div>
			// <div>
			// 	<H2center data={'chat'} />
			// 	<ColsToTable titles={['Time', 'Message']} data={this.props.data} />
			// 	<InputBox socket={this.props.socket}/>
			// </div>
		);
	}
}