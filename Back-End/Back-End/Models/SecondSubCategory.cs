using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back_End.Models
{
  public class SecondSubCategory
  {
    public int id { get; set; }

    public string subCategoryName { get; set; }


    public int subCategoryId { get; set; }
    public subCategory subCategory { get; set; }

    //public Property Property { get; set; }
  }
}
