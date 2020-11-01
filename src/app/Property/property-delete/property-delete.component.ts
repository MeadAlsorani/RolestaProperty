import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../Services/Housing.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-delete',
  templateUrl: './property-delete.component.html',
  styleUrls: ['./property-delete.component.css']
})
export class PropertyDeleteComponent implements OnInit {
  propertyId:number;
  constructor(private hs:HousingService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.propertyId=this.route.snapshot.params['id'];
    this.hs.deleteProperty(this.propertyId).subscribe(
      data=>{
        console.log(data);

      }
    );
  }

}
