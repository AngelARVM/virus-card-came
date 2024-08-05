import { useEffect, useState } from "react";
import { Card } from "../clases/card";
import { TypeCatalog } from "../types/catalogs";

export default function CardColumn({ cards }: { cards: Card[] }): JSX.Element {
  const [column, setColumn] = useState<Card[]>(cards)

  useEffect(() => {
    const reordered = []
    reordered.push(cards.filter(card => card.type === TypeCatalog.ORGAN))
    reordered.push(cards.filter(card => card.type === TypeCatalog.MEDICINE))
    reordered.push(cards.filter(card => card.type === TypeCatalog.VIRUS))

    console.log(reordered)
    setColumn(cards)
  }, [cards])


  return <div className="column">
    {column.map((card: Card) => {
      return card?.imgDir ? (
        <img src={card.imgDir} alt={card.color} key={card.id} />
      ) : null;
    })}
  </div>
}