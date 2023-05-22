import * as utils from '../utils/javachess';

  export let winwithless = {
    title: 'Win with less',
    description: 'Win with less material.',
    check: function(game){
        //check if the game was even won
        
        if(!(game.isWhite && game.header().Result === '1-0' || game.isBlack && game.header().Result === '0-1')){
            return false
        } 
        let score = utils.get_material_score(game);
        return ((game.isWhite && score < 0)||(game.isBlack && score > 0))
    }
  }
  
  export let drawwithless = {
    title: 'Draw with less',
    description: 'Draw with less material.',
    check: function(game){
        //check if the game was even won
        
        if(!(game.header().Result === '1/2-1/2')){
            return false
        } 
        let score = utils.get_material_score(game);
        return ((game.isWhite && score < 0)||(game.isBlack && score > 0))
    }
  }

  export let timewithless = {
    title: 'Win with less on time',
    description: 'Win with less material.',
    check: function(game){
        //check if the game was even won
        if(!(game.isWon && game.oppNoTime)){return false}
        //Get score and check
        let score = utils.get_material_score(game);
        return ((game.isWhite && score < 0)||(game.isBlack && score > 0))
    }
  }

  //matewithless is in checkmates