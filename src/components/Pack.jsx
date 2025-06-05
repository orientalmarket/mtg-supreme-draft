import Card from './Card';

function Pack(props) {
  return (
    <div
      style={{
        display: 'flex',
        maxWidth: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'left',
        overflow: 'scroll',
        padding: '2rem',
      }}
    >
      {props.pack.map((card, index) => (
        <Card name={card} key={index} />
      ))}
    </div>
  );
}

export default Pack;
