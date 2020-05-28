import React from 'react';
import { Link } from 'react-router-dom';
import './main.css';

class Main extends React.Component {
	render() {
		return(
			<div className="main">
				Welcome to BISEO CHAT!
				<div>
					<Link className="enter-but" to="/chat">Enter</Link>
				</div>
			</div>
		);
	}
}

export default Main;
