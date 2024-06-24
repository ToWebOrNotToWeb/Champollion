# Champollion

Permet de retranscrire toute les images du Digital Golbal report, puis les convertis au format pdf.

Les images doivent avoir un url en ligne. En locurence ici les image on était extrait avec le bot simoH.py avant d'étre upload dans des repo github.


## Utilisation

Dans le cmd `git clone git@github.com:ToWebOrNotToWeb/Champollion.git`

Modifier les url en fonction des besoins

Modifier highestNb en fonction des besoins ( correspond au nombre d'itération )

CTRL+C & CTRL+V la liste des pays dans countrys 

Dans le cmd `cd .\champollion\`

Dans le cmd `node index.js`

## Dependence

<ul>
    <li>"fs": "^0.0.1-security"</li>
    <li>openai": "^4.52.0"</li>
    <li>pdfkit": "^0.15.0"</li>
</ul>

## Easter egg
Le nom du projet est une référence à la <a href="https://fr.wikipedia.org/wiki/Pierre_de_Rosette">pierre de Rosette</a> découverte par <a href="https://fr.wikipedia.org/wiki/Jean-Fran%C3%A7ois_Champollion">Jean-François Champollion</a>.
