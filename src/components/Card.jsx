import data from '/src/cube.json';
import { Buffer } from 'buffer/index.js';
import { useState, useEffect } from 'react';

function Card(props) {
  const [isSelected, setIsSelected] = useState(false);
  const cardData = data[props.name];

  const getCardBorderRadius = () => {
    if (cardData.set === 'lea') {
      return '17px';
    }
    return '12px';
  };

  const cardImageLink = '/img/' + Buffer.from(props.name.split(' // ')[0]).toString('base64') + '.png';

  const handleClick = () => {
    props.onPick(props.name);
    setIsSelected((isSelected) => !isSelected);
  };

  useEffect(() => {
    if (props.confirmPicks) {
      setIsSelected(false);
      props.doCallback('pickCard');
    }
    props.doCallback('unselect');
  }, [props.confirmPicks]);

  return (
    <div
      style={{
        width: '18%',
        padding: '5px',
        minWidth: '160px',
        maxWidth: '245px',
      }}
    >
      <img
        src={cardImageLink}
        style={{
          borderRadius: getCardBorderRadius(),
          maxWidth: '100%',
          border: `${isSelected ? '2px ridge white' : ''}`,
          margin: `${isSelected ? '1px' : '3px'}`,
        }}
        onClick={handleClick}
      />
    </div>
  );
}

export default Card;
