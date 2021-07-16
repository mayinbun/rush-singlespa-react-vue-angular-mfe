import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './aragorn.component.html',
  styleUrls: ['./aragorn.component.css'],
})
export class AragornComponent implements OnInit {

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Aragorn aka Strider')
  }

}
