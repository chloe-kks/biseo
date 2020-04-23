import React from 'react';
import logo from './logo.svg';
import './App.css';

import socketio from 'socket.io-client';
const socket = socketio.connect('http://localhost:8081');

class VoteForm extends React.Component {
	constructor (props) {
		super(props)
		this.state = { voteName: '', voteContent: '' }
	}

	voteNameChanged (e) {
		this.setState({voteName: e.target.value})
	}

	voteContentChanged (e) {
		this.setState({voteContent: e.target.value})
	}

	vote_send() {
		socket.emit('vote', {
			voteName: this.state.voteName,
			voteContent: this.state.voteContent,
		})
		this.setState({voteName: '', voteContent: ''})
	}

  render () {
    return (
      <div className="chat">
      	<div className="chat-box">
			투표 이름 : 
			<input value={this.state.voteName} onChange={e => this.voteNameChanged(e)} />
		</div>  
		<div className="chat-box">
			투표 내용 :
			<input value={this.state.voteContent} onChange={e => this.voteContentChanged(e)} />
		</div>
        <button onClick={e => this.vote_send()}>투표시작</button>
      </div>
    )
  }
}


class App extends React.Component {
  constructor(props) {
	super(props)
	this.state = { logs: [], agree: 0, disagree: 0, abs: 0, vote_flag: false }
  }

	vote(e) {
		this.setState({vote_flag: true})
	}

  componentDidMount() {
	socket.on('vote', (obj) => {
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
					vote name : {e.voteName} <br/>
					vote Content : {e.voteContent} 
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
			<div className="chat-room">
				<h1>Make a Vote</h1>
	    		<div>
					<VoteForm />
				</div>
			</div>
		</div>
	</header>
    </div> 
  );
  }
}

export default App;
