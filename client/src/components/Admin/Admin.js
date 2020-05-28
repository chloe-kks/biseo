import React from 'react';
import './Admin.css';

class Formvote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            votetype: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.title);
        event.preventDefault();
        this.props.onClick(this.state.title, this.state.content, this.state.votetype);
        this.setState({
            title: '',
            content: '',
            votetype: '',
        })
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="투표 제목을 입력하세요"
                    value={this.state.title}
                    onChange={this.handleChange}
                /><br />
                <input
                    type="text"
                    name="content"
                    id="content"
                    placeholder="투표 내용을 입력해 주세요"
                    value={this.state.content}
                    onChange={this.handleChange}
                /><br />
                <input
                    type="text"
                    name="votetype"
                    id="subtext"
                    placeholder="의결문안을 입력해주세요"
                    value={this.state.votetype}
                    onChange={this.handleChange}
                /><br />
                <button id="submit" type="submit">만들기</button>
            </form>
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
            <div class="Vote-Background">
                <legend>
                    <button class="vote-form-btn" id="agree-btn" onClick={() => this.handleClick(1)}>찬반 투표</button>
                    <button class="vote-form-btn" id="president-btn"onClick={() => this.handleClick(2)}>회장 선거</button>
                    <button class="vote-form-btn" id="newtem-btn" onClick={() => this.handleClick(3)}>새 템플릿</button>
                </legend>
                <Formvote
                    value={this.state.voteType}
                    onClick={(title, content, votetype) => this.props.onClick(title, content, votetype)}
                />
            </div>
        );
    }
}

class Listvote extends React.Component {
    render() {
        const votelist = this.props.votelist;

        const show_vote_list = votelist.map((vote, num) => {
            if (!vote.title) return;
            return (
                <fieldset key={num}>
                    <p>제목 : {vote.title}</p>
                    <p>내용 : {vote.content}</p>
                    <p>의결 문안 : {vote.votetype}</p>
                </fieldset>
            )
        });

        return (
            <div>{show_vote_list}</div>
        );
    }

}

class Admin extends React.Component {
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

        console.log(future_votes);
        return (
            <div>
                <header>
                    sparcs
        <br />
                </header>
                <div class="left" id="makevote">
                    <Makevote
                        title={current.title}
                        content={current.content}
                        votetype={current.votetype}
                        onClick={(title, content, votetype) => this.handleClick(title, content, votetype)}
                    />
                </div>
                <div class="right" id="listvote">
                    <Listvote
                        votelist={this.state.future_votes}
                    />
                </div>
            </div>
        );
    }
}



export default Admin;
