/**
 * Creates the HTML layout for a single memory card.
 * @param image The filename of the card image.
 * @param themeFolder The folder name of the selected theme.
 * @returns The HTML string for the memory card.
 */
export function getGameFieldLayout(image: string, themeFolder: string){
    return `
      <button class="card" data-card="${image}">
        <div class="card__inner">
          <div class="card__face">
          <img src="/memory/assets/cards/${themeFolder}/${themeFolder}_back.svg" alt="">
          </div>
          <div class="card__face card__face--back">
            <img src="/memory/assets/cards/${themeFolder}/${image}" alt="">
          </div>
        </div>
      </button>
    `;
}