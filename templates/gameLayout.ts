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