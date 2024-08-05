/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useReducer } from "react";
import "./App.css";
import { Card } from "./clases/card";
import { Game } from "./clases/game";
import { User } from "./clases/user";
import { Player } from "./clases/player";
import OponentGround from "./components/oponent-ground";
import Laydown from "./components/laydown";

function App() {
  const hostUser: User = new User("Host", "women_avatar_1");
  const guestUser: User = new User("Guest", "women_avatar_2");
  const guestUser2: User = new User("Guest 2", "men_avatar_1");
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [game, _] = React.useState<Game>(
    new Game([hostUser, guestUser, guestUser2])
  );
  const [players, __] = React.useState<Player[]>(game.players as Player[]);
  const [currentPlayer, setCurrentPlayer] = React.useState<Player>(
    game.currentPlayer
  );
  const [deck, setDeck] = React.useState<Card[]>(game.cardsLeft);

  const handlePickCard = () => {
    game.dealCard(currentPlayer);
    setDeck([...game.cardsLeft]);
    forceUpdate();
  };

  const handlePlay = (targetCard: Card) => {
    game.currentPlayer.move(targetCard);
    forceUpdate();
  };

  const handleEndTurn = () => {
    game.endTurn();
    setCurrentPlayer(game.currentPlayer);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="oponents-groud">
          {players
            .filter(
              (player: Player) => player.user.id !== currentPlayer.user.id
            )
            .map((player: Player) => {
              return <OponentGround player={player} />;
            })}
        </div>
        <div className="deck-container">
          {deck.length > 0 && (
            <div className="deck" onClick={handlePickCard}>
              {deck.map((_, i) => {
                return (
                  <img src="./img/card/card_back.png" alt="card_back" key={i} />
                );
              })}
            </div>
          )}
        </div>
        <div>
          <div className="player-ground">
            <div>
              <div className="player-info">
                <h3>{`${currentPlayer.user.name}`}</h3>
                <img src={currentPlayer.user.logoDir} alt="player" />
              </div>
              <div className="actions">
                <input
                  type="button"
                  value="End Turn"
                  onClick={() => handleEndTurn()}
                />
              </div>
            </div>
            <div className="player-data">
              <Laydown cards={currentPlayer.laydown} />

              <div className="hand">
                {game.currentPlayer?.cardsInHand.map(
                  (card: Card, i: number) => {
                    const angleStep = 15 / (i - 1);
                    return card?.imgDir ? (
                      <div
                        className="hand-card"
                        // style={{ transform: `rotate(${angleStep}deg)` }}
                        onClick={() => handlePlay(card)}
                      >
                        <img src={card.imgDir} alt={card.color} key={card.id} />
                      </div>
                    ) : null;
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
