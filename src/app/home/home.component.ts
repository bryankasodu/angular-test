import { Component, OnInit, OnDestroy  } from '@angular/core';
import { DataService } from '../data.service';


import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  products = [];
  
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService) { }

  ngOnInit() {


    this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((data: any)=>{
      this.products = data;

      console.log(this.products);

    })  
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  consoleLog(value: any) {
    
    type ObjectKey = keyof typeof value;
    const myVar = 'id' as ObjectKey;

    console.log(value[myVar]);

  }

  getValue(obj: any, value: any){
    type ObjectKey = keyof typeof obj;
    const myVar = value as ObjectKey;

    return obj[myVar]
  }

}