import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
	pets: any;
  constructor(private _http: HttpService) { }

  ngOnInit() {
  	let observable = this._http.getPets();
  	observable.subscribe(data=>{
  		console.log(data)
  		this.pets = data['Pets'];
  	})
  }

}
