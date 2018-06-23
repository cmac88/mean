import { Component, OnInit } from '@angular/core';
import { HttpService } from ".././http.service";
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  errors: any;
  pet:any;
  constructor(private _http: HttpService, private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.pet = { name : '', type: '', description: '', skill1: '', skill2: '', skill3: ''}
  }
  onSubmit(){
    console.log(this.pet)
    let observable = this._http.addPet(this.pet)
    observable.subscribe(data=>{
      if(data['errors']){
        this.errors = []
        for(let e in data['errors']){
          this.errors.push(data['errors'][e])
        } 
        console.log(this.errors)
      }
      else{
        this._router.navigate(['/'])
      }
    })
  }
}
