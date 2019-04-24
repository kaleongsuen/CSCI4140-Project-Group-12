import React from "react";
import CardFront from "../Card/CardFront";

export default function Center(props) {
  const { history } = props.G;
  const { phase } = props.ctx;

  return (
    <div className={"center " + (props.G.reverse ? "reverse" : "")}>
      <div>
        <div className="last-hand">
          {history.hand
            ? history.hand.map(card => <CardFront card={card} key={card} />)
            : ""}
        </div>
        <div className="message">
          {props.isActive
            ? (phase === "exchange" ? 
                (props.G.players[props.playerID].rank === 1 ? "Please give any two cards to Poo" 
                  : (props.G.players[props.playerID].rank === 2 ? "Please give any one card to Pee" 
                    : (props.G.players[props.playerID].rank === 3 ? "Please give the largest card to Noble" 
                      : "Please give two largest cards to King"
                      )
                    )
                )
              : "Your Turn")
            : `Waiting for Player ${props.ctx.currentPlayer}`}
        </div>
      </div>
    </div>
  );
}
