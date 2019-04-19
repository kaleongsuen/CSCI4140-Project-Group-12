import setup from '../setup';

export default {
  next: 'ready',
  allowedMoves: ['playCard', 'pass', 'sort', 'setHand'],
  endTurnIf: (G, ctx) =>{
    if (G.players[ctx.currentPlayer].end_game) {
      console.log("skip turn");
      return true;
    }
    // console.log(ctx.currentPlayer);
  },
  endPhaseIf: (G, ctx) => {
    if(G.rank_count===5){
      return true;
    }
  },
  // onPhaseEnd: (_, ctx) => {
  //   // return setup(ctx);
  //   return false;
  // }
};