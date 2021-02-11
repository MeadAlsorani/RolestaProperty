import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProperty, IHeating } from '../../Interfaces/IProperty.interface';
import { HousingService } from '../../Services/Housing.service';
import * as myGlobals from '../../../assets/global';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  propertyId:number;
  imageUrl:string="Resources/Images/";
  baseUrl=myGlobals.baseUrl;
  modalRef: BsModalRef;
  property:IProperty={
    SecondSubCategory:null,
    adOwner:null,
    area:null,
    buildingAge:null,
    buildingFloors:null,
    category:null,
    categoryId:null,
    city:null,
    date:null,
    description:null,
    floor:null,
    heating:null,
    heatingId:null,
    id:null,
    image:null,
    inSite:null,
    isFurnished:null,
    name:null,
    noOfRooms:null,
    price:null,
    proceeds:null,
    provience:null,
    secondSubCategoryId:null,
    street:null,
    subCategory:null,
    subCategoryId:null,
    type:null,
    typeId:null

  };
  heat:IHeating={
    heatingName:null,
    id:null
  }
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private hs:HousingService,
    private modalService: BsModalService
    ) { }
  ngOnInit(): void {
    this.propertyId=+this.route.snapshot.params['id'];
    this.hs.getPropertyById(this.propertyId).subscribe(
      data=>{
        this.property=data;
        this.hs.getHeatingById(this.property.heatingId).subscribe(
          heatDate=>{
            this.heat=heatDate;
          }
        )
      }
    )
  }
  pic;
  openModal(template: TemplateRef<any>,item) {
     this.pic=item;
    this.modalRef = this.modalService.show(template,Object.assign({},{class:'modal-lg'}));
  }

}
