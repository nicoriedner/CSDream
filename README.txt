Um das Projekt zu starten muss zuerst die Datenbank verbunden werden.
- jdbc:postgresql://localhost:5432/CSDreamDB
- Username: postgres
- Password: postgres

Danach das Backend und das Frontend starten.
- Backend via BackendApplication
- Frontend im Terminal under dem frontend-Verzeichnis mit npm start

Dependencies zum Runterladen:
- npm i install
- react-datepicker
- react-router-dom

Als erstes wird man auf die Homepage geleitet. Hier sieht man oben in der Navbar die 3 verschiedenen Seiten:
- Home (wo man sich gerade auch befindet)
- Inventar
- Freebies
Man sieht auf der rechten Seite auch noch ein Symbol und den Schriftzug "Login". Hier kann man sich später einloggen/registrieren.
Weiter unten sieht man die aktuellen Spielmodi:
- Cases
- Upgrader
und ganz unten ist der Footer mit dem Logo und nochmal den Unterseiten.

Zur Erklärung der einzelnen Pages:
- Home -> nur die Startseite
- Inventar -> Hier sieht man, wenn man eingeloggt ist, die Skins, welche sich der User schon geholt hat. mit diesen kann man dann upgraden, oder angeben.
- Freebies -> Eine kleine Seite welche ein paar skins anzeigt, welche täglich sich ändern und eine tägliche Case, welche einmalig gratis zu öffnen ist.
- Cases -> Hier sieht man die aktuell verfügbaren Cases. Jede hat ihren Preis zu öffnen, aber je höher der Preis desto besser der reward.
- Upgrader -> Hier kann man skins aus dem eigenen Inventar einfügen und, wenn man Glück hat, bekommt man etwas besseres.
- Login -> Hier kann man sich mit seinem Benutzernamen und Passwort anmelden. falls noch kein Account verfügbar ist, kann man darunter auf einen Link drücken und sich so Registrieren. Dann nur noch eine weitere Anmeldung und alles ist getan.

WICHTIG!
- wenn ein skin zum User hinzugefügt wird, muss man in der DB unter userskin MANUELL die skinId und die userId auf den passenden Skin/Nutzer setzen.