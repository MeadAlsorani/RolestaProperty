using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back_End.Models
{
  public class Property
  {
    //  id:number,//
    public int id { get; set; }

    //Name:string,//
    public string Name { get; set; }

    //Price:number,//
    public int Price { get; set; }

    //provience:string,//
    public string provience { get; set; }

    //city:string,//
    public string city { get; set; }

    //street:string,//
    public string street { get; set; }

    //NoOfRooms:number,//
    public int NoOfRooms { get; set; }

    //Type:string,//
    public string Type { get; set; }

    //Description:string,
    public string Description { get; set; }
  }
}
