import Card from './Card';

function Pool(props) {
  return (
    <div>
      {props.pool.map((card, index) => {
        return <Card name={card} key={index} />;
      })}
    </div>
  );
}

export default Pool;
