namespace Back_End.Models
{
  public class Property
  {
    public int id { get; set; }

    public string Name { get; set; }

    public int Price { get; set; }

    public string provience { get; set; }

    public string city { get; set; }

    public string street { get; set; }

    public int NoOfRooms { get; set; }

    public int area { get; set; }

    public int buildingAge { get; set; }

    public int floor { get; set; }

    public int buildingFloors { get; set; }

    public string adOwner { get; set; }

    public string date { get; set; }

    public bool isFurnished { get; set; }

    public bool inSite { get; set; }

    public int proceeds { get; set; }
    public string Description { get; set; }

    public string[] Image { get; set; }

    public int typeId { get; set; }
    public type type { get; set; }

    public int heatingId { get; set; }
    public heating heating { get; set; }

    public int? categoryId { get; set; }
    public category category { get; set; }

    public int? subCategoryId { get; set; }
    public subCategory subCategory { get; set; }

    public int? secondSubCategoryId { get; set; }
    public SecondSubCategory SecondSubCategory { get; set; }
  }
}
