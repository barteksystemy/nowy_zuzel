export class Game {
    constructor () {
    // zmienne potrzebne do generowania planszy
    this.img = new Image();
    this.img2 = new Image();
    this.c = document.getElementById("myCanvas");
    this.ctx = this.c.getContext("2d");
    this.pat;
    this.pat2;
    // zmienne potrzebne do poprawnego działania silnika gry
    this.mtr = { x: 220, y: 325 };
    this.x = 220;
    this.y = 325;
    this.dy = 0;
    this.dx = 10;
    this.xp = this.mtr.x;
    this.yp = this.mtr.y;
    this.alfa = 0;
    this.R = 5;
    this.sina;
    this.cos;
    // zmienne potrzebne do poprawnego działania pojazdu
    this.carImg;
}
    generowanie_planszy () {
        this.img.src = "static/img/road.jpeg";
        this.img.onload = () => {
        this.pat = this.ctx.createPattern(this.img, "repeat");

        this.img2.src = "static/img/grass.jpeg";
        this.img2.onload = () => {
        this.pat2 = this.ctx.createPattern(this.img2, "repeat");

        // pojazd

        this.carImg = new Image();
        this.carImg.src = "static/img/motorcycle.png";
        this.carImg.onload = () => {

        // tworzę planszę
          this.ctx.fillStyle = this.pat;
          this.ctx.beginPath();
          this.ctx.arc(200, 200, 180, 0.5 * Math.PI, 1.5 * Math.PI);
          this.ctx.lineWidth = 5;
          this.ctx.arc(600, 200, 180, 1.5 * Math.PI, 0.5 * Math.PI);
          this.ctx.closePath();
          this.ctx.fill();
          this.ctx.stroke();
          this.ctx.fillStyle = this.pat2;
          this.ctx.beginPath();
          this.ctx.arc(200, 200, 60, 0.5 * Math.PI, 1.5 * Math.PI);
          this.ctx.arc(600, 200, 60, 1.5 * Math.PI, 0.5 * Math.PI);
          this.ctx.closePath();
          this.ctx.fill();
          this.ctx.stroke();
        }
        }
      }
    }

    sprawdzaj_kolizje() {
    const imageData = this.ctx.getImageData(this.xk, this.yk, 1, 1);
    const pixel = imageData.data;
    // sprawdzanie czy pixel bieżący jest szary
      if (pixel[0] === 128 && pixel[1] === 128 && pixel[2] === 128) {
      window.setTimeout(() => {
      alert("Przegrałeś!");
      document.location.reload();
      }, 50);
        }
      //
    }

    silnik_gry() {
    // tworzę pustą tablice żeby zbierać informacje o pozycji motocyklu
    this.carPositions = [];

    // ustawiam motocykl na początek trasy
    this.ctx.beginPath();
    this.ctx.moveTo(this.mtr.x, this.mtr.y);

    const checkKey = (e) => {
        if (e.keyCode == "68") {
            // klawisz A
            this.alfa += 0.0872664626; // Zwiększam alfe o 5 stopni
        } else if (e.keyCode == "65") {
            // klawisz D
            this.alfa -= 0.0872664626; // Zmniejszam alfe o 5 stopni
        }
    }

        setInterval(() => {
        // tworzę ponownie tor
        this.ctx.fillStyle = this.pat;
        this.ctx.beginPath();
        this.ctx.arc(200, 200, 180, 0.5 * Math.PI, 1.5 * Math.PI);
        this.ctx.lineWidth = 3;
        this.ctx.arc(600, 200, 180, 1.5 * Math.PI, 0.5 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.fillStyle = this.pat2;
        this.ctx.beginPath();
        this.ctx.arc(200, 200, 60, 0.5 * Math.PI, 1.5 * Math.PI);
        this.ctx.arc(600, 200, 60, 1.5 * Math.PI, 0.5 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.beginPath();
        //
        document.onkeydown = checkKey;
        this.sina = Math.sin(this.alfa).toFixed(3);
        this.cosa = Math.cos(this.alfa).toFixed(3);
        this.dy = this.sina * this.R;
        this.dx = this.cosa * this.R;
        this.xp += this.dx;
        this.yp += this.dy;
        this.xk = this.xp;
        this.yk = this.yp;
        // sprawdzam kolizje
        this.sprawdzaj_kolizje();

        // dodaje motocykl do tablicy
        this.carPositions.push({ x: this.xk, y: this.yk });

        // rysuje ślad za motocyklem
        this.ctx.moveTo(this.carPositions[0].x, this.carPositions[0].y);
        for (let i = 1; i < this.carPositions.length; i++) {
            this.ctx.lineTo(this.carPositions[i].x, this.carPositions[i].y);
        }
        // 
        const angle = Math.atan2(this.dy, this.dx);
        this.ctx.save();
        this.ctx.translate(this.xp, this.yp);
        // obraca pojazd o obliczony kąt
        this.ctx.rotate(angle + 1.5708);
        this.ctx.drawImage(this.carImg, -this.carImg.width / 2, -this.carImg.height / 2);
        this.ctx.restore();
        this.ctx.strokeStyle = "gray";
        this.ctx.stroke();
}, 35);
  }
}