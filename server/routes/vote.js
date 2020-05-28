var express = require('express');
var router = express.Router();
const Vote = require('../models/vote.js');

    // GET ALL VOTES
    router.get('/list', function(req,res){
		Vote.find(function(err, votes){
			if(err) return res.status(500).send({error: 'database failure'});
			return res.json(votes);
		});
    });

    // GET SINGLE VOTE
    router.get('/list/:vote_id', function(req, res){
		Vote.findOne({_id: req.params.vote_id}, function(err, votes){
			if(err) return res.status(500).send({error: err});
			if(!book) return res.status(404).json({error: 'vote not found'});
			return res.json(vote);
		});
    });

    // GET VOTE BY NAME
    router.get('/list/:name', function(req, res){
		Vote.findOne({name: req.params.title}, function(err, votes){
			if(err) return res.status(500).json({error: err});
			if(votes.length === 0) return res.status(404).json({error: 'vote not found'});
			return res.json(vote);
		});
    });

    // CREATE VOTE
    router.post('/upload', function(req, res){
		console.log(req.body);
		const new_vote = new Vote();
		new_vote.name = req.body.title;
		new_vote.content = req.body.content;
		new_vote.agree = 0;
		new_vote.disagree = 0;
		new_vote.abstention = 0;
		new_vote.save(function(err){
			if(err){
				console.error(err);
				return res.status(500);
			}
			return res.status(200).redirect("http://aria.sparcs.org:32905/test");
		});
    });

    // UPDATE THE VOTE
    router.put('/upload/:vote_id', function(req, res){
		Vote.findById(req.params.vote_id, function(err, vote){
			if(err) return res.status(500).json({ error: 'db failure' });
			if(!vote) return res.status(404).json({ error: 'vote not found' });

			if(req.body.title) vote.name = req.body.title;
			if(req.body.content) vote.content = req.body.content;
			if(req.body.agree) vote.agree += 1;
			if(req.body.disagree) vote.disagree += 1;
			if(req.body.abstetion) vote.abstention += 1;

			vote.save(function(err){
				if(err) return res.status(500).json({error: 'failed to update'});
				return res.json({message: 'vote updated'});
			});
		});
    });

    // DELETE VOTE
    router.delete('/upload/:vote_id', function(req, res){
		Vote.remove({_id: req.params.vote_id }, function(err, output){
			if(err) return res.status(500).json({ error: 'db failure' });
			return res.status(204).end();
		});
    });

module.exports = router;
