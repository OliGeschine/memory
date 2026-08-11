export function renderGameLayout(): string {
    return `
    <section id="field" class="field">
        <button class="card">
            <div class="card__inner">
                <div class="card__face"></div>
                <div class="card__face card__face--back"></div>
            </div>
        </button>
        <button class="card">
            <div class="card__inner">
                <div class="card__face"></div>
                <div class="card__face card__face--back"></div>
            </div>
        </button>
        <button class="card">
            <div class="card__inner">
                <div class="card__face"></div>
                <div class="card__face card__face--back"></div>
            </div>
        </button>
        <button class="card">
            <div class="card__inner">
                <div class="card__face"></div>
                <div class="card__face card__face--back"></div>
            </div>
        </button>
    </section>
    `;
}

export function flippAnimation() {
    const fieldRef = document.getElementById('field');
    if (fieldRef) {
        fieldRef.addEventListener("click", e => {
            const card = (e.target as HTMLElement).closest('.card') as HTMLButtonElement;
            if (card) {
                card.classList.toggle('is-flipped');
            }
        })
    }
}