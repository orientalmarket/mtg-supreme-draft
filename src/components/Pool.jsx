import Card from './Card';

function Pool(props) {
  return (
    <div
      style={{
        display: 'flex',
        maxWidth: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'left',
        overflow: 'auto',
      }}
    >
      {props.pool.map((card, index) => (
        <Card
          card={card}
          key={index}
          // onPick={props.onPick}
          // confirmPicks={props.confirmPicks}
          doCallback={props.doCallback}
        />
      ))}
    </div>
  );
}

export default Pool;
