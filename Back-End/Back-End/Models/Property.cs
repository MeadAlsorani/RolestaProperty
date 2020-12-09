using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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


    public string Type { get; set; }

    public string Description { get; set; }

    public string[] Image { get; set; }
        
  }
}
