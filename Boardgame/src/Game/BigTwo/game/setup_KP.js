import poker from './helper/poker';
import createPlayers from './helper/player.js';

export default function setup(G, ctx) {

  if(G.secret){
    let old_players = G.players;

    // for (let i = 0; i < 4; i++) {
    //   old_players[i].end_game = false;
    //   old_players[i].cards = [];
    // }
    const new_players = {};
    for (let i = 0; i < 4; i++) {
      new_players[i] = {
            ready: true,
            rank: old_players[i].rank,
            end_game: false,
            cards: []
          };
    }

    let exchange_order = [];
    for(let i = 0; i < 4; i++){
      exchange_order[i] = G.win_order[3-i]
    }

    return {
      secret: {
        poker
      },
      history: {
        hand: null,
        player: ctx.currentPlayer
      },
      reverse: false,
      last_win: G.last_win,
      rank_count: 1,
      win_order: G.win_order,
      exchanged: 0,
      exchangeOrder: exchange_order,
      change_history: false,
      // ctx.numPlayers incorrect in some time
      players: new_players
    };
  }
  return {
      secret: {
        poker
      },
      history: {
        hand: null,
        player: ctx.currentPlayer
      },
      reverse: false,
      last_win: "-1",
      rank_count: 1,
      win_order: [],
      exchanged: 0,
      exchangeOrder: [],
      change_history: false,
      // ctx.numPlayers incorrect in some time
      players: createPlayers(4)
    };
}
