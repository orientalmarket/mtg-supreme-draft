import data from '/src/cube.json';

function Card(props) {
  const getCardBorderRadius = () => {
    const cardName = props.name;
    const cardData = data[cardName];
    if (cardData.set === 'lea') {
      return '17px';
    }
    return '12px';
  };

  const cardImageLink = '/img/' + btoa(props.name.split(' // ')[0]) + '.png';

  return (
    <div style={{ maxWidth: '10%', margin: '5px', padding: '10px' }}>
      <img
        src={cardImageLink}
        style={{
          borderRadius: getCardBorderRadius(),
          maxWidth: '100%',
        }}
      />
    </div>
  );
}

export default Card;
