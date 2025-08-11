# Lärplattform

En enkel modulär lärplattform för att skapa övningar och lektioner.

## Struktur
- `index.html` - startpunkt för sidan.
- `style.css` - enkel modern design.
- `script.js` - laddar moduler och visar lektioner.
- `modules/` - katalog med moduler i JSON-format.

### Skapa ny modul
Skapa en ny JSON-fil i `modules/` med följande struktur:
```json
{
  "title": "Ämnets namn",
  "lessons": [
    {
      "title": "Lektionstitel",
      "content": "Beskrivning av lektionen",
      "exercise": {
        "prompt": "Instruktion till övning",
        "solution": "Exempellösning"
      }
    }
  ]
}
```
Lägg till filens sökväg och namn i arrayen `modules` i `script.js` för att synliggöra den på sidan.

## Utveckling
Kör `npm test` för att verifiera att projektet är korrekt installerat (just nu finns inga tester).
