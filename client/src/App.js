import React from 'react';
import logo from './logo.svg';
import './App.css';

import socketio from 'socket.io-client';
const socket = socketio.connect('http://localhost:8081');

class Form extends React.Component {
	constructor (props) {
		super(props)
		this.state = { name: 'Moss', message: '' , votename: 'Biseo'}
	}

	messageChanged (e) {
		this.setState({message: e.target.value})
	}

	send() {
		socket.emit('chat message', {
			name: this.state.name,
			message: this.state.message
		})
		this.setState({message: ''})
	}

    vote_send() {
        socket.emit('vote', {
			votename: this.state.votename
        })
        this.setState({votename: ''})
    }

  render () {
    return (
      <div style={{display: 'flex', flexDirection: 'column', width: '50%'}}>
        메시지:<br />
        <input value={this.state.message}
          onChange={e => this.messageChanged(e)} /><br />
        <button onClick={e => this.send()}>전송</button>
      </div>
    )
  }

}

class App extends React.Component {
  constructor(props) {
	super(props)
	this.state = { logs: [] }
  }

  componentDidMount() {
	socket.on('chat message', (obj) => {
		const logs2 = this.state.logs
		obj.key = 'key_' + (this.state.logs.length+1)
		console.log(obj)
		logs2.unshift(obj)
		this.setState({logs: logs2})
	})
  }

  render() {
  const messages = this.state.logs.map(e => (
	<div style={{display: 'flex', flexDirection: 'column'}} key={e.key} >
		<span >{e.name} : </span>
		<span >{e.message}</span>
		<p style={{clear: 'both'}} />
	</div>
	))
  const vote = this.state.logs.map(e => (
	<div style={{display: 'flex', flexDirection: 'column'}} key={e.key} >
		<span>{e.votename} <br/></span>
		<span>찬성</span>
		<span>반대</span>
		<p style={{clear: 'both'}} />
	</div>
	))
  return (
	<div className="App">
	<header className="App-header">
		<div style={{display: 'flex', flexDirection: 'row'}}>
		<div style={{display: 'flex', flexDirection: 'column', margin:20}}>
			<h1>Chatting room</h1>
    		<div>
      			<div>
        			{messages}
      			</div>
      			<div>
					<Form />
      			</div>
			</div>
		</div>
		<div style={{display: 'flex', flexDirection: 'column', margin:20}}>
			<h1>Vote room</h1>
			<div>
				{vote}
			</div>
		</div>
		</div>
	</header>
    </div> 
  );
  }
}

export default App;
