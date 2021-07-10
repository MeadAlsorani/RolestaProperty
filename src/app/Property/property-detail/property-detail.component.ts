import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProperty, IHeating } from '../../Interfaces/IProperty.interface';
import { HousingService } from '../../Services/Housing.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent implements OnInit {
  propertyId: number;
  imageUrl: string = 'Resources/Images/';
  baseUrl = environment.baseUrl;
  modalRef: BsModalRef;
  similerProperties: IProperty[];
  currentLang: string;
  isLoading:boolean=true;
  property: IProperty = {
    SecondSubCategory: null,
    adOwner: null,
    area: null,
    buildingAge: null,
    buildingFloors: null,
    category: null,
    categoryId: null,
    city: null,
    date: null,
    description: null,
    floor: null,
    heating: null,
    heatingId: null,
    id: null,
    image: null,
    inSite: null,
    isFurnished: null,
    name: null,
    noOfRooms: null,
    price: null,
    proceeds: null,
    provience: null,
    secondSubCategoryId: null,
    street: null,
    subCategory: null,
    subCategoryId: null,
    type: null,
    typeId: null,
    phoneNumber: null,
    descriptionEn: null,
    descriptionTr: null,
  };
  heat: IHeating = {
    heatingName: null,
    id: null,
  };
  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private hs: HousingService,
    private modalService: BsModalService,
    private router: Router,
    private _sanitizer:DomSanitizer
  ) {}
  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((data)=>{
      this.currentLang=data.lang
    })
    this.route.params.subscribe((data) => {
      this.propertyId = data.id;
      this.hs.getPropertyById(this.propertyId).subscribe((data) => {
        this.property = data;
        this.hs
          .getSimilerProperties(data.secondSubCategoryId)
          .subscribe((similer) => {
            this.similerProperties = similer.filter(x=>x.id!=data.id);
          });
          this.isLoading=false;
      });
    });
  }
  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  pic;
  openModal(template: TemplateRef<any>, item) {
    this.pic = item;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg' })
    );
  }
}
