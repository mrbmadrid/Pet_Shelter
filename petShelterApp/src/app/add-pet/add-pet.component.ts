import { Component, OnInit } from '@angular/core';
import { NgForm }  from '@angular/forms';
import { HttpService } from'../http.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {
	pet : any;
	errors = [];
  	constructor(private _http: HttpService) {}

  	resetForm(){
  		this.pet = {
  			name : "",
  			type : "",
  			description : "",
  			skills : []
  		};
  	}

  	ngOnInit() {
  		this.resetForm();
  		console.log(this.pet)
  	}

  	addPet() {
      this.errors=[];
	  	let observable = this._http.newPet(this.pet)
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
	  			window.location.href = "/";
	  		}
  		})
  }

}
