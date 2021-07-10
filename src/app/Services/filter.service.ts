import { Injectable } from '@angular/core';
import {
  filterObject,
  FilterParameters,
  filterRoot,
} from '../Interfaces/ResponseObject';
@Injectable({
  providedIn: 'root',
})
export class FilterService {
  public defaultFilter: filterRoot = {
    pagination: {
      pageNumber: 1,
      pageSize: 20,
    },
    sort: {
      isAsec: true,
      sortBy: 'date',
    },
    filters: {},
  };
  constructor() {
    this.defaultFilter.filters = { '': {} };
  }
  propertiesFilter(filterParams: FilterParameters): filterRoot {
    let filters: { [colName: string]: filterObject } = {};
    if (filterParams.categoryId) {
      filters = {
        categoryId: {
          singleValue: filterParams.categoryId.toString(),
        },
      };
    }

    if (filterParams.noOfRooms) {
      filters = {
        NoOfRooms: {
          singleValue: filterParams.noOfRooms.toString(),
        },
      };
    }

    if (filterParams.name) {
      filters = {
        Name: {
          singleValue: filterParams.name,
        },
      };
    }

    if (filterParams.highArea) {
      filters = {
        area: {
          valueTo: filterParams.highArea.toString(),
          valueFrom: '',
        },
      };
      if (filterParams.lowArea) {
        filters = {
          area: {
            valueTo: filterParams.highArea.toString(),
            valueFrom: filterParams.lowArea.toString(),
          },
        };
      }
    }

    if (filterParams.lowArea) {
      filters = {
        area: {
          valueFrom: filterParams.lowArea.toString(),
          valueTo: '',
        },
      };
      if (filterParams.highArea) {
        filters = {
          area: {
            valueFrom: filterParams.lowArea.toString(),
            valueTo: filterParams.highArea.toString(),
          },
        };
      }
    }
    if (filterParams.highPrice) {
      filters.Price = {};
      filters.Price = {
        valueTo: filterParams.highPrice.toString(),
        valueFrom: '',
      };

      if (filterParams.lowPrice) {
        filters.Price = {
          valueTo: filterParams.highPrice.toString(),
          valueFrom: filterParams.lowPrice.toString(),
        };
      }
    }
    if (filterParams.lowPrice) {
      filters.Price = {};
      filters.Price = {
        valueFrom: filterParams.lowPrice.toString(),
        valueTo: '',
      };

      if (filterParams.highPrice) {
        filters.Price = {
          valueTo: filterParams.highPrice.toString(),
          valueFrom: filterParams.lowPrice.toString(),
        };
      }
    }
    if (filterParams.buildingAgeHigh) {
      filters = {
        buildingAge: {
          valueTo: filterParams.buildingAgeHigh.toString(),
          valueFrom: '',
        },
      };
      if (filterParams.buildingAgeLow) {
        filters = {
          buildingAge: {
            valueTo: filterParams.buildingAgeHigh.toString(),
            valueFrom: filterParams.buildingAgeLow.toString(),
          },
        };
      }
    }
    if (filterParams.buildingAgeLow) {
      filters = {
        buildingAge: {
          valueFrom: filterParams.buildingAgeLow.toString(),
          valueTo: '',
        },
      };
      if (filterParams.buildingAgeHigh) {
        filters = {
          buildingAge: {
            valueFrom: filterParams.buildingAgeLow.toString(),
            valueTo: filterParams.buildingAgeHigh.toString(),
          },
        };
      }
    }
    this.defaultFilter.filters = filters;
    return this.defaultFilter;
  }
}
