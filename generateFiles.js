import { readFileSync, writeFileSync } from 'fs';
import fetch from 'node-fetch';

let cards = readFileSync('public/data/MTGOVintageCube.txt', {
  encoding: 'utf8',
})
  .trim()
  .split('\r\n')
  .filter((card) => card);
let result = {};

async function main() {
  while (cards.length) {
    let card = cards.shift();
    let chemotherapy =
      '+not:extended+prefer:oldest+not:prerelease+not:fullart+not:convention+not:fnm+not:datestamped+not:instore+not:buyabox+not:judge_gift+not:gameday+not:giftbox+not:player_rewards+not:intro_pack';
    let response = await fetch(
      `https://api.scryfall.com/cards/search?order=released&dir=asc&unique=prints&q=!"${encodeURIComponent(
        card
      )}"${chemotherapy}`
    );
    if (response.json().data && response.ok) {
      let scryfall = (await response.json()).data[0];
      result[card] = scryfall;
      let imagePath =
        scryfall.card_faces && scryfall.card_faces[0].image_uris
          ? scryfall.card_faces[0].image_uris.normal
          : scryfall.image_uris.normal;
      let imgRes = await fetch(imagePath);
      let img = await imgRes.buffer();
      let cardNameBase64 = Buffer.from(card.split(' // ')[0]).toString(
        'base64'
      );
      writeFileSync(`public/img/${cardNameBase64}.png`, img);
    } else {
      let response = await fetch(
        `https://api.scryfall.com/cards/search?order=released&dir=asc&unique=prints&q=!"${encodeURIComponent(
          card
        )}"`
      );
      let scryfall = (await response.json()).data[0];
      result[card] = scryfall;
      let imagePath =
        scryfall.card_faces && scryfall.card_faces[0].image_uris
          ? scryfall.card_faces[0].image_uris.normal
          : scryfall.image_uris.normal;
      let imgRes = await fetch(imagePath);
      let img = await imgRes.buffer();
      let cardNameBase64 = Buffer.from(card.split(' // ')[0]).toString(
        'base64'
      );
      writeFileSync(`public/img/${cardNameBase64}.png`, img);
    }
  }
  writeFileSync('public/data/cube.json', JSON.stringify(result));
}

main();
