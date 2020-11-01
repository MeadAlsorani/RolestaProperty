import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProperty } from '../IProperty';
import { HousingService } from '../../Services/Housing.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  propertyId:number;
  property:IProperty;
  constructor(
    private route:ActivatedRoute
    ,private router:Router
    ,private hs:HousingService) { }

  ngOnInit(): void {
    this.propertyId=+this.route.snapshot.params['id'];
    this.hs.getPropertyById(this.propertyId).subscribe(
      data=>{
        this.property=data;
        console.log(data);
      }
    )
  }

  onNext(){
    this.propertyId +=1;
    this.router.navigate(['property-detail',this.propertyId]);
  }

}
