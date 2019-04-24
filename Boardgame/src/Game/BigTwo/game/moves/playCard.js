import {
  INVALID_MOVE
} from 'boardgame.io/core';
import {
  Hand
} from 'pokersolver';
import pullAll from 'lodash/pullAll';

export default function (G, ctx, playerCards, combination) {
  if (Array.isArray(combination) && combination.length && G.secret) {
    const newHand = Hand.solve(combination, 'bigtwo');
    const NeedToCheck = G.history.player !== ctx.currentPlayer;

    let win = true;
    let sameLength = true;

    let iWinTheGame = false;

    const cards = newHand.toArray(true);
    const playerCardsRemain = pullAll(playerCards.slice(), cards);

    if (newHand.isPossible) {
      if (NeedToCheck) {
        const lastHand = Hand.solve(G.history.hand, 'bigtwo');
        if(G.reverse){
          win = newHand !== Hand.winners([newHand, lastHand])[0];
        }else{
          win = newHand === Hand.winners([newHand, lastHand])[0];
        }
        sameLength = cards.length === lastHand.cards.length;
      }

      if (win && sameLength) {
        G.players[ctx.currentPlayer].cards = playerCardsRemain;
        G.history.hand = cards;
        G.history.player = ctx.currentPlayer;

        if (G.players[ctx.currentPlayer].cards.length === 0) {
          console.log("(playCard) - no cards left");
          if(G.players[ctx.currentPlayer].end_game == false){
            if(G.rank_count === 1){
              if(G.last_win !== ctx.currentPlayer && G.last_win !== "-1"){
                G.reverse = true;
              }
              G.last_win = ctx.currentPlayer;
              console.log("(playCard) - set last_win = "+G.last_win);
            }
            if(G.win_order.length == 4){
              G.win_order = [];
            }
            G.win_order.push(ctx.currentPlayer);
            console.log("(playCard) - set win_order = "+G.win_order);
            G.players[ctx.currentPlayer].end_game = true;
            console.log("(playCard) - set end_game = true");
            G.players[ctx.currentPlayer].rank = G.rank_count;
            console.log("(playCard) - set rank = "+G.players[ctx.currentPlayer].rank);
            G.rank_count=G.rank_count+1;
            console.log("(playCard) - set rank_count = "+G.rank_count);
            G.change_history = true;
            console.log("(playCard) - set change_history = "+G.change_history);
            iWinTheGame = true;
          }
        }
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

        if(!iWinTheGame){
          if(G.change_history){
            G.history.player = ctx.currentPlayer;
            console.log("(playCard) - set history.player = "+G.history.player);
            G.change_history = false;
            console.log("(playCard) - set change_history = "+G.change_history);
          } 
        }

        if (G.rank_count === 4) {
          G.win_order.push(ret_tmp);
          console.log("(playCard) - set win_order = "+G.win_order);
          G.players[ret_tmp].rank = G.rank_count;
          console.log("(playCard) - set rank = "+G.players[ret_tmp].rank);
        }
        
        ctx.events.endTurn({next:ret_tmp});

        return G;
      }

      switch (false) {
        case win:
          console.log('This hand lose to then last hand');
          break;
        case sameLength:
          console.log('Length of hand is not same');
          break;
        default:
      }
    } else {
      console.log('Tthis hand cannot be solved', cards);
    }
  }

  return INVALID_MOVE;
}