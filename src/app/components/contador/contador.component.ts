import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styles: [
  ]
})
export class ContadorComponent implements OnInit {

  @Input() counter:number = 0;
  @Input() identifier:string;
  constructor() { }

  ngOnInit(): void {
  }

}
