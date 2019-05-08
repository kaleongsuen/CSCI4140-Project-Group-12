import React from "react";
import CardBack from "../Card/CardBack";
import king from "../icon/king.png";
import noble from "../icon/noble.png";
import pee from "../icon/pee.png";
import poo from "../icon/poo.png";
import nullIcon from "../icon/null.png";

export default function OtherPlayers(props) {
  return (
    <>
      {props.G.otherPlayers.map((player, playerIdx) => {
        const clasNameForPos = ["left", "top", "right"][playerIdx];

        return (
          <div
            className={`other-player player-${player.id} ${clasNameForPos}`}
            key={player.id}
          >
            <div className="grid-container">
              <div>
                {yourRank(player.rank)} Player {player.id}
                <br />
                <br />
                <br />
                <br />
              </div>
              {new Array(player.cards).fill(null).map((_, index) => {
                return <CardBack degree={(playerIdx + 1) * 90} key={index} />;
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

function yourRank(rank) {
  console.log("ID: " + rank);
  switch (rank) {
    case null:
      return "No Rank";
    case 0:
      return (
        <img style={{ width: 30, height: 30 }} src={nullIcon} alt="Logo" />
      );
    case 1:
      return <img style={{ width: 30, height: 30 }} src={king} alt="Logo" />;
    case 2:
      return <img style={{ width: 30, height: 30 }} src={noble} alt="Logo" />;
    case 3:
      return <img style={{ width: 30, height: 30 }} src={pee} alt="Logo" />;
    case 4:
      return <img style={{ width: 30, height: 30 }} src={poo} alt="Logo" />;
  }
}
