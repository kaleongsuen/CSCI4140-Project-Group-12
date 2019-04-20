import setup from '../setup';

export default {
  next: 'ready',
  allowedMoves: ['playCard', 'pass', 'sort', 'setHand'],

  // onTurnEnd: (G, ctx) =>({next:'3'}),
  //   let tmp = ctx.currentPlayer;
  //   let ret_tmp = tmp;
  //   if(tmp == 0){
  //     if(!G.players[1].end_game){
  //       ret_tmp = '1';
  //     }else if(!G.players[2].end_game){
  //       ret_tmp = '2';
  //     }else if(!G.players[3].end_game){
  //       ret_tmp = '3';
  //     }else ret_tmp = '0';
  //   }else if(tmp == 1){
  //     if(!G.players[2].end_game){
  //       ret_tmp = '2';
  //     }else if(!G.players[3].end_game){
  //       ret_tmp = '3';
  //     }else if(!G.players[0].end_game){
  //       ret_tmp = '0';
  //     }else ret_tmp = '1';
  //   }else if(tmp == 2){
  //     if(!G.players[3].end_game){
  //       ret_tmp = '3';
  //     }else if(!G.players[0].end_game){
  //       ret_tmp = '0';
  //     }else if(!G.players[1].end_game){
  //       ret_tmp = '1';
  //     }else ret_tmp = '2';
  //   }else if(tmp == 3){
  //     if(!G.players[0].end_game){
  //       ret_tmp = '0';
  //     }else if(!G.players[1].end_game){
  //       ret_tmp = '1';
  //     }else if(!G.players[2].end_game){
  //       ret_tmp = '2';
  //     }else ret_tmp = '3';
  //   }

  //   console.log("current: "+tmp);
  //   console.log("return: "+ret_tmp);
  //   return ({next: '2'});
  //   // console.log(ctx.currentPlayer);
  // },
  endPhaseIf: (G, ctx) => {
    if(G.rank_count===4){
      return true;
    }
  },
  onPhaseEnd: (_, ctx) => {
    return setup(ctx);
    // return false;
  }
};