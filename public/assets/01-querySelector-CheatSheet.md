# TypeScript Cheat Sheet – querySelector()

# Was ist `querySelector()`?

Mit `querySelector()` kannst du **ein HTML-Element auswählen**, damit du anschließend damit arbeiten kannst.

Stell dir deine HTML-Datei wie ein Haus vor:

```html
<div class="card"></div>
<button id="restart">Neu starten</button>
<h1>Memory</h1>
```

Mit `querySelector()` sagst du:
> "Gib mir genau dieses Element."

## Grundaufbau

```ts
document.querySelector("CSS-Selektor");
```

Der String ist derselbe Selektor, den du auch in CSS verwendest.

## 1. Element über eine ID auswählen

```html
<button id="restart">Neu starten</button>
```

```ts
const button = document.querySelector("#restart");
```

`#` bedeutet: Suche nach einer **ID**.

## 2. Element über eine Klasse auswählen

```html
<div class="card"></div>
```

```ts
const card = document.querySelector(".card");
```

`.` bedeutet: Suche nach einer **Klasse**.

## 3. Nach einem HTML-Tag suchen

```ts
const title = document.querySelector("h1");
```

## 4. Verschachtelte Elemente suchen

```html
<div class="game">
  <div class="card"></div>
</div>
```

```ts
const card = document.querySelector(".game .card");
```

## querySelector() gibt nur EIN Element zurück

Nutze `querySelectorAll()` wenn du alle passenden Elemente brauchst:

```ts
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  console.log(card);
});
```

# Was kann ich mit dem ausgewählten Element machen?

## Text ändern
```ts
title!.textContent = "Memory Game";
```

## HTML ändern
```ts
title!.innerHTML = "<span>Memory Game</span>";
```

## CSS ändern
```ts
(title as HTMLElement).style.color = "red";
```

## Klassen verwalten
```ts
card!.classList.add("active");
card!.classList.remove("active");
card!.classList.toggle("active");
card!.classList.contains("active");
```

## Klicks erkennen
```ts
card!.addEventListener("click", () => {
  console.log("Karte angeklickt");
});
```

## Attribute lesen und ändern
```ts
image!.getAttribute("src");
image!.setAttribute("src", "dog.png");
```

## Elemente anzeigen oder verstecken
```ts
(card as HTMLElement).style.display = "none";
(card as HTMLElement).style.display = "block";
```

## Inhalt leeren
```ts
board!.innerHTML = "";
```

## Neue Elemente erzeugen
```ts
const card = document.createElement("div");
card.classList.add("card");
board!.appendChild(card);
```

## Element löschen
```ts
card!.remove();
```

# TypeScript-Besonderheit

`querySelector()` kann `null` zurückgeben.

Sicher:

```ts
const button = document.querySelector("#restart");

if (button) {
  button.textContent = "Neu";
}
```

Wenn du sicher bist, dass das Element existiert:

```ts
button!.textContent = "Neu";
```

Oder mit Typ:

```ts
const button = document.querySelector("#restart") as HTMLButtonElement;
```

# Typischer Ablauf in einem Memory-Spiel

```ts
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});
```

## Ablauf

1. Alle Karten auswählen.
2. Jeder Karte einen Klick-Listener geben.
3. Beim Klick die Klasse `flipped` umschalten.
4. CSS zeigt anhand der Klasse Vorder- oder Rückseite.

# Wichtigste Methoden

| Methode | Verwendung im Memory |
|---|---|
| `querySelector()` | Einzelne Elemente auswählen |
| `querySelectorAll()` | Alle Karten auswählen |
| `addEventListener()` | Auf Klick reagieren |
| `classList.add()` | Klasse hinzufügen |
| `classList.remove()` | Klasse entfernen |
| `classList.toggle()` | Karte umdrehen |
| `classList.contains()` | Prüfen ob Karte offen ist |
| `textContent` | Spielstand ändern |
| `innerHTML` | Spielfeld neu erzeugen |
| `appendChild()` | Karten hinzufügen |
| `remove()` | Karten löschen |
| `style` | CSS direkt ändern |

# Empfehlung

- `querySelector()` für einzelne Elemente (Buttons, Score, Timer)
- `querySelectorAll()` für alle Karten
- `addEventListener()` statt `onclick`
- Nutze CSS-Klassen über `classList` statt viele Inline-Styles
