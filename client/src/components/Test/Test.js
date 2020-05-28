import React from 'react';
import axios from 'axios';
import OneVote from './OneVote';

class Formvote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            votetype: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleClick() {
        alert("투표를 저장했습니다.");
    }



    render() {
        return (
			<div>
            <form method="post" action="http://aria.sparcs.org:32903/api/v1/votes/upload">
                <input
                    type="text"
                    name="title"
                    placeholder="투표 제목을 입력하세요"
                    value={this.state.title}
                    onChange={this.handleChange}
                /><br />
                <input
                    type="text"
                    name="content"
                    placeholder="투표 내용을 입력해 주세요"
                    value={this.state.content}
                    onChange={this.handleChange}
                /><br />
                <input
                    type="text"
                    name="votetype"
                    placeholder="의결문안을 입력해주세요"
                    value={this.state.votetype}
                    onChange={this.handleChange}
                /><br />
                <button type="submit" onClick={this.handleClick}>만들기</button>
            </form>
			</div>
        );
    }
}

class Makevote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            voteType: 0,
        };
    }

    handleClick(mode) {
        this.setState(
            { voteType: mode }
        )
    }

    render() {
        return (
            <fieldset>
                <legend>
                    <button onClick={() => this.handleClick(1)}>찬반 투표</button>
                    <button onClick={() => this.handleClick(2)}>회장 선거</button>
                    <button onClick={() => this.handleClick(3)}>새 템플릿</button>
                </legend>
                <Formvote
                    value={this.state.voteType}
                    onClick={(title, content, votetype) => this.props.onClick(title, content, votetype)}
                />
            </fieldset>
        );
    }
}

class Listvote extends React.Component {

    componentDidMount() {
        this.fetchPostInfo(1);
    }

    constructor(props) {
        super();
        // initializes component state
        this.state = {
            is_Loaded: false,
            fetching: false, // tells whether the request is waiting for response or not
            vote: [],
        };
    }

    fetchPostInfo = async () => {
        this.setState({
            fetching: true // requesting..
        });

        const info = await Promise.all([
            axios.get('http://aria.sparcs.org:32903/api/v1/votes/list')
        ]);

		//console.log(info);

        const votes_data = info[0].data;

        votes_data.reverse();
		//console.log(votes_data);
        this.setState({
            vote: votes_data,
            fetching: false, // done!
            is_Loaded: true
        });
    }

    render() {
        const votelist = this.state.vote;
        const vote_items = [];
        if(votelist.length != 0){
            for (const [index, value] of votelist.entries()) {
                const name = value.name;
				//console.log(name);
                vote_items.push(<OneVote key={index} name={name}/>); // TODO : 시작 종료버튼 있는 투표 1개 엘리먼트
            }
        }
        return (
            <div>{vote_items}</div>
        );
    }

}

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            future_votes: [{
                title: '',
                content: '',
                votetype: '',
            }],
            stepNumber: 0,
        };

    }

    handleClick(title, content, votetype) {
        const future_votes = this.state.future_votes.slice(0, this.state.stepNumber + 1);
        this.setState({
            future_votes: future_votes.concat([
                {
                    title: title,
                    content: content,
                    votetype: votetype,
                }
            ]),
            stepNumber: future_votes.length,
        });
    }

    render() {
        const future_votes = this.state.future_votes;
        const current = future_votes[this.state.stepNumber];

        //console.log(future_votes);
        return (
            <div>
                <header>
                    sparcs <br />
                </header>
                <Makevote
                    title={current.title}
                    content={current.content}
                    votetype={current.votetype}
                    onClick={(title, content, votetype) => this.handleClick(title, content, votetype)}
                />
                <Listvote/>
            </div>
        );
    }
}



export default Test;
