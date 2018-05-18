import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
	pet = {
  			name : "",
  			type : "",
  			description : "",
  			skills : [{skill:""},{skill:""},{skill:""},]
  		};
	errors = [];
	success = false;
	like = true;
  	constructor(private _http: HttpService, private route: ActivatedRoute) {}

  	ngOnInit() {
  		this.success = false;
  		this.loadPet();
  	}
  	loadPet(){
  		this.route.params.subscribe(params=> {
  		let observable = this._http.getPet(params['id'])
  		observable.subscribe(data=>{
  			this.pet = data['Pet'][0];
  			this.success = true;
  		})
  		})
  	}
  	adopt(){
  		let observable = this._http.adopt(this.pet['_id']);
  		observable.subscribe(data =>{
  			console.log(data);
  			window.location.href = "/";
  		})
  	}

  	likePet(){
  		let observable = this._http.like(this.pet['_id']);
  		observable.subscribe(data =>{
  			console.log(data)
  			this.like = false;
  			this.loadPet();
  		})
  	}
}