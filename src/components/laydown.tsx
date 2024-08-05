import { Card } from "../clases/card";
import CardColumn from "./card-column";

export default function Laydown({ cards }: { cards: Card[] }): JSX.Element {
  const columns = cards.reduce((acc: Record<string, Card[]>, card: Card) => {
    acc[card.color].push(card)
    return acc
  }, {red: [], blue: [], green: [], yellow: []})

  return (
    <div className="laydown">
      {Object.values(columns).map((column: Card[], index) => {
        return <CardColumn cards={column} key={index} />
      })}
    </div>
  );
}
