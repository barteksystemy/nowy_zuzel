export class Game {
    constructor () {
        // zmienne potrzebne do generowania planszy
        this.img = new Image();
        this.img2 = new Image();
        this.c = document.getElementById("myCanvas");
        this.ctx = this.c.getContext("2d");
        this.pat;
        this.pat2;
        // zmienna potrzebne do poprawnego działania silnika gry
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
    } 
    generowanie_planszy () {
        this.img.src = "static/img/road.jpeg";
        this.img.onload = () => {
        this.pat = this.ctx.createPattern(this.img, "repeat");

        this.img2.src = "static/img/grass.jpeg";
        this.img2.onload = () => {
        this.pat2 = this.ctx.createPattern(this.img2, "repeat");

        // tworzę planszę
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
        }
        }
    }

    silnik_gry () {
        this.ctx.beginPath();
        this.ctx.moveTo(this.mtr.x, this.mtr.y);

        const checkKey = (e) => {
      if (e.keyCode == "68") {
        // klawisz A
        if (this.alfa < 3.141593) {
          this.alfa += 0.0872664626; // Zwiększam alfe o 5 stopni
        }
      } else if (e.keyCode == "65") {
        // klawisz D
        if (this.alfa < 3.141593) {
          this.alfa -= 0.0872664626; // Zmniejszam alfe o 5 stopni
        }
    }
}

        setInterval(() => {
            document.onkeydown = checkKey;
            this.sina = Math.sin(this.alfa).toFixed(3);
            this.cosa = Math.cos(this.alfa).toFixed(3);
            this.dy = this.sina * this.R;
            this.dx = this.cosa * this.R;
            this.xp += this.dx;
            this.yp += this.dy;
            this.xk = this.xp;
            this.yk = this.yp;
            this.ctx.lineTo(this.xk, this.yk);
            this.ctx.stroke();
}, 40);

    

    }
    
}