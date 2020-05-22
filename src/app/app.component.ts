import { Component, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { Star } from './star';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  switch: boolean = false;
  objectItem: Array<Star> = [
    {
      name: 'Star1',
      colour: 'blue',
      r: 10,
      y: 50,
      x: 50,
      n: 5,
      inset: 2.5,
      switch: true
    },
    {
      name: 'Star2',
      colour: 'red',
      r: 10,
      y: 50,
      x: 100,
      n: 5,
      inset: 2.5,
      switch: true
    },
    {
      name: 'Star3',
      colour: 'yellow',
      r: 10,
      y: 50,
      x: 150,
      n: 5,
      inset: 2.5,
      switch: true
    },
    {
      name: 'Star4',
      colour: 'beige',
      r: 10,
      y: 50,
      x: 200,
      n: 5,
      inset: 2.5,
      switch: true
    },
    {
      name: 'Star5',
      colour: 'black',
      r: 10,
      y: 50,
      x: 250,
      n: 5,
      inset: 2.5,
      switch: true
    }
  ]


  @ViewChild('myCanvas', { static: true })
  myCanvas: ElementRef<HTMLCanvasElement>;

  @ViewChild('myCanvas2', { static: true })
  myCanvas2: ElementRef<HTMLCanvasElement>;

  @HostListener('click', ['$event'])
  click(event: MouseEvent) {
  let count = this.objectItem.length
    if (count > 0) {
      this.objectItem[count-1].switch = false;
      this.update();
      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      this.objectItem.pop();
  }
}

  constructor(private renderer: Renderer2) {

  }
  public context: CanvasRenderingContext2D;
  public context2: CanvasRenderingContext2D;


  ngOnInit(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.context2 = this.myCanvas2.nativeElement.getContext('2d');
    this.update();
  }



  //Box making function
  // makeBox(x, y, width, height, color, context?) {
  //   if (context == 'canvas1') {
  //   // Rectangle
  //   this.context.fillStyle = color;
  //   this.context.fillRect(x, y, width, height);
  //   } else {
  //     this.context2.fillStyle = color;
  //     this.context2.fillRect(x, y, width, height);
  //   }
  // }


  //Star Drawing function
  drawStar(x, y, r, n, inset, context?) {
    if (context == 'canvas1') {
      this.context.save();
      this.context.beginPath();
      this.context.translate(x, y);
      this.context.moveTo(0, 0 - r);
      for (var i = 0; i < n; i++) {
        this.context.lineTo(0, 0 - r);
        this.context.rotate(Math.PI / n);
        this.context.lineTo(0, 0 - (r * inset));
        this.context.rotate(Math.PI / n);
      }
      this.context.closePath();
      this.context.fill();
      this.context.restore();
    } else {
      this.context2.save();
      this.context2.beginPath();
      this.context2.translate(x, y);
      this.context2.moveTo(0, 0 - r);
      for (var i = 0; i < n; i++) {
        this.context2.lineTo(0, 0 - r);
        this.context2.rotate(Math.PI / n);
        this.context2.lineTo(0, 0 - (r * inset));
        this.context2.rotate(Math.PI / n);
      }
      this.context2.closePath();
      this.context2.fill();
      this.context2.restore();
    }
  }

  update() {
    for (let i = 0; i < this.objectItem.length; i++) {
      if (this.objectItem[i].switch === true) {
        this.drawStar(this.objectItem[i].x, this.objectItem[i].y, this.objectItem[i].r, this.objectItem[i].n, this.objectItem[i].inset, 'canvas1');
      } else if (this.objectItem[i].switch === false) {
        this.drawStar(this.objectItem[i].x, this.objectItem[i].y, this.objectItem[i].r, this.objectItem[i].n, this.objectItem[i].inset, 'canvas2');
      }
    }

    requestAnimationFrame(this.update.bind(this));
  }

}
