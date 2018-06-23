import { Component, OnInit } from '@angular/core';
import { HttpService } from '.././http.service'
@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  public pets: any;
    constructor(private _http: HttpService) { }
  
    ngOnInit() {
      this.getAll()
    }
    getAll(){
      let observable = this._http.getPets()
      observable.subscribe(data=> {
        this.pets = data
      })
    }
}
