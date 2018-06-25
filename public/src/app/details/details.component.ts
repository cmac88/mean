import { Component, OnInit } from '@angular/core';
import { HttpService } from ".././http.service";
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  pet: any;
  pid: any;
  errors: any;
  click: any = true;
  constructor(private _http: HttpService, private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.pid = params['id']);
    this.getPet(this.pid)
  }
  getPet(id){
    let observable = this._http.grabPet(id)
    observable.subscribe(data=>{
    this.pet = data;
    })
  }
  likeUp(id){
    let observable = this._http.like(id)
    observable.subscribe(data=>{
    this.click = false
    this.getPet(this.pid)
    })
  }
  delete(id){
    let observable = this._http.deletePet(id)
    observable.subscribe(data=>{
      console.log(data)
      this._router.navigate(['/'])
    })
  }
}
