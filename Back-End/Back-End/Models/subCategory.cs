using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back_End.Models
{
    public class subCategory
    {
    public int id { get; set; }

    public string subCategoryName { get; set; }



    public int CategoryId { get; set; }
    public category category { get; set; }

    public IList<SecondSubCategory> secondSubCategories { get; set; }
    public Property Property { get; set; }
  }
}
