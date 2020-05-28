import React from 'react';
import axios from 'axios';
import './test.css';
import socketio from 'socket.io-client';
const socket = socketio.connect('http://aria.sparcs.org:32903');

class OneVote extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: this.props.name,
			isStart: false,
			end: false
			};
		this.StartClick = this.StartClick.bind(this);	
	}

	StartClick(){
		this.setState(state => ({
      		isStart: true
    	}));
		socket.emit('startVote', {
			name : this.state.name
		})
	}

	render(){
		const name = this.props.name;
		return(
			<div className="onevote">
				<div>{name}</div>
				{
					this.state.isStart ?
						<div className="process"> 진행중 </div>
					:
						<button className="startbut" onClick={this.StartClick}>시작</button>
				}
			</div>
		);
	}
}

export default OneVote;	
