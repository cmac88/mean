import { Component, OnInit } from '@angular/core';
import { HttpService } from ".././http.service";
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  pet: any;
  pid: any;
  errors: any
  update: any
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

  onSubmit(id){
    console.log(this.pet)
    let observable = this._http.editPet(id, this.pet)
    observable.subscribe(data=>{
      if(data['errors']){
        console.log(data['errors'])
        this.errors = []
        for(let e in data['errors']){
          this.errors.push(data['errors'][e])
        } 
        
      }
      else{
        this._router.navigate(['/'])
      }
    })
}
}