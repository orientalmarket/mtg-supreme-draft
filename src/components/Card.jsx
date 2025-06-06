import { Buffer } from 'buffer/index.js';
import { useState, useEffect } from 'react';

function Card(props) {
  const [isSelected, setIsSelected] = useState(false);

  const getCardBorderRadius = () => {
    if (props.card.set === 'lea') {
      return '17px';
    }
    return '12px';
  };

  const handleClick = () => {
    props.onPick(props.card);
    setIsSelected((isSelected) => !isSelected);
  };

  const getCardImage = () => {
    var imageLink = null;
    if (props.card !== undefined) {
      if (props.card.image_uris !== undefined) {
        imageLink = props.card.image_uris.normal;
      } else if (props.card.card_faces !== undefined) {
        if (props.card.card_faces.length > 0) {
          imageLink = props.card.card_faces[0].image_uris.normal;
        }
      }
    }

    return imageLink;
  };

  useEffect(() => {
    if (props.confirmPicks) {
      setIsSelected(false);
      props.doCallback('pickCard');
    }
    props.doCallback('unselect', '');
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
        src={getCardImage()}
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
