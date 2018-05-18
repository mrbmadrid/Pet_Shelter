import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {
  skills = [{skill:""}, {skill:""},{skill:""}]
  pet = {
        name : "",
        type : "",
        description : "",
        skills : this.skills
      };
	errors = [];
	success = false;
  	constructor(private _http: HttpService, private route: ActivatedRoute) {}

  	ngOnInit() {
  	this.success = false;
  	this.route.params.subscribe(params=> {
  		let observable = this._http.getPet(params['id'])
  		observable.subscribe(data=>{
  			this.pet = data['Pet'][0];
        if(this.pet['skills'].length < 3){
          this.pet['skills'].push({skill:""});
        }
  			this.success = true;
  		})
  	})
  }

  	editPet() {
      this.errors = [];
	  	let observable = this._http.editPet(this.pet)
	  	observable.subscribe(data=>{
	  		if("errors" in data){
	  			if(data['errors'].name=="MongoError" && data['errors'].code=="11000"){
	  				this.errors.push(this.pet.name + " has already been added to the shelter.");
	  			}
	  			else{
	  				let err = data['errors']['message'].split(',');
	  				for(let error of err){
	  					let temp = error.split(':');
	  					this.errors.push(temp[temp.length-1]);
	  				}
	  			}
	  		}else{
          window.location.href = "/details-app/"+this.pet['_id'];
	  			console.log("Success")
	  		}
  		})
  }
}