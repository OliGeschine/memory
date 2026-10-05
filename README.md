# 🧠 Memory Game

Ein browserbasiertes Memory-Spiel für zwei Spieler mit verschiedenen Themes, Boardgrößen und einem dynamischen Punktesystem.

## 🎮 Über das Spiel

Memory Game ist ein klassisches Memory-Spiel, das mit TypeScript, HTML und SCSS entwickelt wurde.

Zwei Spieler treten abwechselnd gegeneinander an und versuchen, möglichst viele Kartenpaare zu finden. Vor dem Spiel können das gewünschte Theme, der Startspieler und die Größe des Spielfelds ausgewählt werden.

Das Spiel verwaltet automatisch die Spielerwechsel, Punktestände und das Spielende und zeigt anschließend den Gewinner oder ein Unentschieden an.

## ✨ Features

- 🎨 Zwei verschiedene Game Themes: Code Vibes und Gaming
- 👥 Zwei Spieler: Blue und Orange
- 🃏 Drei verschiedene Boardgrößen mit 16, 24 oder 36 Karten
- 🔀 Zufällige Anordnung der Karten bei jedem Spiel
- 🔄 Automatischer Spielerwechsel bei einem falschen Kartenpaar
- 🏆 Automatische Gewinnerermittlung
- 🤝 Erkennung eines Unentschiedens
- 📊 Dynamische Punkteanzeige
- 🎉 Theme-abhängige Winner-Overlays und Animationen
- 🚪 Bestätigungsdialog zum Verlassen eines laufenden Spiels
- 📱 Responsive Layout
- 📚 JSDoc-Dokumentation
- 🧩 Modular aufgebaute TypeScript-Struktur

## 🕹️ Spielablauf

1. Wähle ein Game Theme aus.
2. Wähle den Startspieler.
3. Wähle eine Boardgröße mit 16, 24 oder 36 Karten.
4. Starte das Spiel.
5. Decke nacheinander zwei Karten auf.
6. Bei einem passenden Paar erhält der aktuelle Spieler einen Punkt.
7. Bei einem falschen Paar ist der andere Spieler an der Reihe.
8. Das Spiel endet, sobald alle Kartenpaare gefunden wurden.
9. Der Spieler mit den meisten Punkten gewinnt.

## 🎯 Spielziel

Finde mehr Kartenpaare als dein Mitspieler.

Wer am Ende die meisten Paare gefunden hat, gewinnt das Spiel. Haben beide Spieler gleich viele Punkte, endet das Spiel unentschieden.

## 🛠️ Technologien

- **TypeScript** - Spiellogik und DOM-Manipulation
- **HTML5** - Grundstruktur der Anwendung
- **SCSS** - Styling und Responsive Design
- **JavaScript (ES6+)** - Kompilierter TypeScript-Code
- **JSDoc** - Code-Dokumentation
- **npm** - Paketverwaltung und Scripts

## 🏗️ Projektstruktur

```text
memory/
├── src/
│   ├── boards.ts          # Themes und Board-Konfiguration
│   ├── game.ts            # Zentrale Spiellogik
│   ├── gameBoard.ts       # Erstellung und Rendering des Spielfelds
│   ├── gameExit.ts        # Logik zum Verlassen des Spiels
│   ├── gameOver.ts        # Game-Over- und Gewinnerlogik
│   ├── main.ts            # Initialisierung und View-Steuerung
│   └── settings.ts        # Einstellungen und Spielauswahl
│
├── templates/
│   ├── startscreenLayout.ts
│   ├── settingsLayout.ts
│   ├── gameLayout.ts
│   └── exitOverlays.ts
│
├── scss/
│   ├── components/
│   ├── layout/
│   └── main.scss
│
├── docs/                  # Generierte JSDoc-Dokumentation
├── docs-js/               # Temporärer JavaScript-Build für JSDoc
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.docs.json
├── jsdoc.json
└── README.md
```

> `docs-js/` wird nur temporär für die Erstellung der JSDoc-Dokumentation erzeugt und ist über `.gitignore` vom Repository ausgeschlossen.

## 📦 Installation & Start

1. **Repository klonen:**

   ```bash
   git clone https://github.com/OliGeschine/memory.git
   ```

2. **In das Projektverzeichnis wechseln:**

   ```bash
   cd memory
   ```

3. **Dependencies installieren:**

   ```bash
   npm install
   ```

4. **Projekt starten:**

   Verwende das in `package.json` konfigurierte Development-Script oder öffne das Projekt über deinen lokalen Development-Server.

## 📚 JSDoc Dokumentation

Die TypeScript-Dateien des Projekts sind mit JSDoc-Kommentaren dokumentiert.

Da JSDoc die TypeScript-Dateien nicht direkt verarbeitet, werden sie für die Dokumentation zunächst in einen temporären JavaScript-Ordner kompiliert.

Die Dokumentation kann mit folgendem Befehl generiert werden:

```bash
npm run docs
```

Dabei wird:

```text
TypeScript
    ↓
docs-js/
    ↓
JSDoc
    ↓
docs/
```

erzeugt.

Die fertige Dokumentation befindet sich anschließend im Ordner:

```text
docs/
```

Auf macOS kann die Startseite der Dokumentation beispielsweise mit folgendem Befehl geöffnet werden:

```bash
open docs/index.html
```

## 🧩 Code-Struktur

Die Spiellogik wurde auf mehrere Module aufgeteilt, um die einzelnen Verantwortlichkeiten voneinander zu trennen:

- `main.ts` steuert die verschiedenen Ansichten und initialisiert das Spiel.
- `settings.ts` verwaltet Theme-, Spieler- und Boardauswahl.
- `gameBoard.ts` erstellt und rendert die Memory-Karten.
- `game.ts` enthält die zentrale Match- und Spielerlogik.
- `gameExit.ts` verwaltet das Verlassen eines laufenden Spiels.
- `gameOver.ts` wertet das Spiel aus und zeigt den Gewinner an.
- `boards.ts` enthält die verfügbaren Karten und Board-Konfigurationen.
- `templates/` enthält die HTML-Templates der verschiedenen Ansichten und Overlays.

## 🎓 Entwickelt als Teil der Developer Akademie

Dieses Projekt wurde im Rahmen der **Developer Akademie** entwickelt und demonstriert unter anderem:

- Programmierung mit TypeScript
- DOM-Manipulation
- Event-Handling
- Modulare Code-Organisation
- Dynamisches Rendering von HTML
- Arbeiten mit SCSS
- Responsive Webdesign
- Dokumentation mit JSDoc
- Versionsverwaltung mit Git und GitHub

## 📝 Dokumentation

Eine JSDoc-Dokumentation der Funktionen und Module ist im `/docs`-Ordner verfügbar.

## 🎨 Credits

- **Entwicklung:** Oliver Geschine
- **Projekt:** Developer Akademie

## 📄 Lizenz

Dieses Projekt wurde zu Bildungszwecken erstellt.

## 🚀 Live Demo

<!-- Hier später deine Live-Demo-URL einfügen -->

Eine Live-Demo wird hier verlinkt.

---

**Viel Spaß beim Spielen! 🎮🧠**