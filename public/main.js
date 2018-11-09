
const form=document.getElementById('form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const choice=document.querySelector('input[name=food]:checked').value;
    const data={food:choice};

fetch('/poll',{
        method:'post',
        body:JSON.stringify(data),
        headers:new Headers({
            'Content-Type':'application/json'
        })
    })
      .then(res=>res.json())
      .then(data=>console.log(data))
      .catch(err =>console.log(error))
});

fetch('/poll')
  .then(res=>res.json())
   .then(data=>{
    const votes=data.votes;
    const totalVotes =votes.length;

let voteCounts = {
            Fries: 0,
            Pizza: 0,
            Chaap: 0,
            Paasta: 0,
            Momos:0
        };

    voteCounts = votes.reduce((acc, vote) => (
            (acc[vote.food] = (acc[vote.food] || 0) + parseInt(vote.points)), acc),
            {}
        );



    let dataPoints = [
    {label:'Fries',y:voteCounts.Fries},
    {label:'Pizza',y:voteCounts.Pizza},
    {label:'Chaap',y:voteCounts.Chaap},
    {label:'Paasta',y:voteCounts.Paasta},
    {label:'Momos',y:voteCounts.Momos},
]

const chart=document.querySelector('#chart');
if(chart){
    const chart=new CanvasJS.Chart('chart',{
        animationEnabled:true,
        theme:'theme1',
        title:{
            text: `Total Votes ${totalVotes}`
        },
        data:[
            {
                type:'column',
                dataPoints:dataPoints
            }
        ]
    });
    chart.render();

    Pusher.logToConsole = true;

    var pusher = new Pusher('701f087c5025a0cb4d3d', {
      cluster: 'mt1',
      forceTLS: true
    });

    var channel = pusher.subscribe('food-poll');
    channel.bind('food-vote', function(data) {
       dataPoints=dataPoints.map(x=>{
           if(x.label==data.food){
               x.y+=data.points;
               return x;
           }
           else{
               return x;
           }
       });
        chart.render();
    });


}



});
