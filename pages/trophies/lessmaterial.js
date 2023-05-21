
  
  export let winwithless = {
    title: 'Win with less',
    description: 'Win with less material.',
    check: function(game){
        //check if the game was even won
        
        if(!(game.isWhite && game.header().Result === '1-0' || game.isBlack && game.header().Result === '0-1')){
            return false
        } 
        let fen = game.fen().split(" ")[0]; //careful, fen includes a small b at the end if it's blacks turn
        console.log(fen)
        let score = 0
        let points = {
            P:1,
            N:3,
            B:3,
            R:5,
            Q:9,
            p:-1,
            n:-3,
            b:-3,
            r:-5,
            q:-9
        }
        for(let c of fen){
            //console.log(c)
            score+=points[c]||0       //0 wenn er keinen Buchstaben findet.
        }
        console.log(score)
        return ((game.isWhite && score < 0)||(game.isBlack && score > 0))
    }
  }
  