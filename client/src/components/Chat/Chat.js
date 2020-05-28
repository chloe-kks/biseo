import React from 'react';
import './chat.css';
import socketio from 'socket.io-client';
const socket = socketio.connect('http://aria.sparcs.org:32903');

class Chat extends React.Component {
  constructor(props) {
	super(props)
	this.state = { logs: [], agree: 0, disagree: 0, abs: 0, vote_flag: false }
  }

	vote(e) {
		this.setState({vote_flag: true})
	}

  componentDidMount() {
	socket.on('get_data', (obj) => {
		const logs2 = this.state.logs
		obj.key = 'key_' + (this.state.logs.length+1)
		console.log(obj)
		logs2.unshift(obj)
		this.setState({logs: logs2})
	})
  }

  render() {
  	const vote = this.state.logs.map(e => (
		<div className="vote-box" key={e.key} >
			<div className="vote-border">
				<div className="vote-header"> 
					vote name : {e.name} <br/>
					vote Content : {e.content} 
				</div>
				{
					this.state.vote_flag ? 
					null
					:
					<div className="vote-selector">
						<button onClick={e => this.vote(e)} className="vote-select-button">찬성 </button>
						<button onClick={e => this.vote(e)} className="vote-select-button">반대 </button>
						<button onClick={e => this.vote(e)} className="vote-select-button">기권 </button>
					</div>
				}
			</div>
		</div>
	))
  return (
	<div>
	<header>
		<div className="full-view">
			<div className="vote-room">
				<h1>Vote room</h1>
				{vote}
			</div>
		</div>
	</header>
    </div> 
  );
  }
}

export default Chat;
