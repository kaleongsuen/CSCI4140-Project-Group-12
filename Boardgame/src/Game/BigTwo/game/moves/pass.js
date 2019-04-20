import { INVALID_MOVE } from 'boardgame.io/core';

export default function pass(G, ctx) {
  if (ctx.currentPlayer === G.history.player) {
    console.log('You cannot pass');
    return INVALID_MOVE;
  }
  if(G.secret){
  	let tmp = ctx.currentPlayer;
	let ret_tmp = tmp;
	if(tmp == 0){
	  if(!G.players[1].end_game){
	    ret_tmp = '1';
	  }else if(!G.players[2].end_game){
	    ret_tmp = '2';
	  }else if(!G.players[3].end_game){
	    ret_tmp = '3';
	  }else ret_tmp = '0';
	}else if(tmp == 1){
	  if(!G.players[2].end_game){
	    ret_tmp = '2';
	  }else if(!G.players[3].end_game){
	    ret_tmp = '3';
	  }else if(!G.players[0].end_game){
	    ret_tmp = '0';
	  }else ret_tmp = '1';
	}else if(tmp == 2){
	  if(!G.players[3].end_game){
	    ret_tmp = '3';
	  }else if(!G.players[0].end_game){
	    ret_tmp = '0';
	  }else if(!G.players[1].end_game){
	    ret_tmp = '1';
	  }else ret_tmp = '2';
	}else if(tmp == 3){
	  if(!G.players[0].end_game){
	    ret_tmp = '0';
	  }else if(!G.players[1].end_game){
	    ret_tmp = '1';
	  }else if(!G.players[2].end_game){
	    ret_tmp = '2';
	  }else ret_tmp = '3';
	}
    console.log("current: "+tmp);
    console.log("return: "+ret_tmp);

	if(G.change_history){
		G.history.player = ctx.currentPlayer;
		console.log("(playCard) - set history.player = "+G.history.player);
		G.change_history = false;
		console.log("(playCard) - set change_history = "+G.change_history);
	} 

	ctx.events.endTurn({next:ret_tmp});
	return G;
  }else {
  	return INVALID_MOVE;
  }
  
  
  // ctx.events.endTurn();
}
