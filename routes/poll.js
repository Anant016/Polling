const express=require('express');

const router=express.Router();

const Vote=require('../models/vote');

const Pusher = require('pusher');
var pusher = new Pusher({
  appId: '',
  key: 'Your key',
  secret: '97be74cfad7245lkjhgfdqwerty;l,mnbxcfc039bc',
  cluster: 'mt1',
  encrypted: true
});

router.get('/',(req,res)=>{
    Vote.find().then(votes=>{
        res.json({success:true,votes:votes})
    })
})

router.post('/',(req,res)=>{
    const newVote={
        food:req.body.food,
        points:1
    }

    new Vote(newVote).save().then(vote=>{
     pusher.trigger('food-poll', 'food-vote', {
        points:parseInt(vote.points),
        food:vote.food
    });
    return res.json({success:true, message:'Thankyou for sharing.'})
     })
})



module.exports=router;
