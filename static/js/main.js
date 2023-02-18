import {Game} from "./modules/class.js"

const gra = new Game()
gra.generowanie_planszy()
document.getElementById("myCanvas").onclick = function () {
    gra.silnik_gry()
}