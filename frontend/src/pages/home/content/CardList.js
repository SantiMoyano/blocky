import { CardInfo } from "./CardInfo";

export function CardList({ list }) {
  return (
    <div className="flex flex-wrap justify-center m-8 gap-16 card-list">
      {list.map((elem) => (
        <CardInfo cardContent={elem} />
      ))}
    </div>
  );
}
