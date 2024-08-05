import { Player } from "../clases/player";
import Laydown from "./laydown";

function OponentGround({ player }: Record<string, Player>): JSX.Element {


  return (
    <div>
      <h2>{player.user.name}</h2>
      <div className="oponent-hand">
        {player?.cardsInHand?.map((card) => {
          console.log(card);
          return (
            <div className="card" key={card.id}>
              <img src={card.imgDir} alt={"oponent card"} key={card.id} />
            </div>
          );
        })}
      </div>
      <div className="laydown">
        <Laydown cards={player.laydown} />
      </div>
    </div>
  );
}

export default OponentGround;
