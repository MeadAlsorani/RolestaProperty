using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back_End.Models
{
  public class BasicCategory
  {
    public int id { get; set; }
    public string BasicCategoryName { get; set; }

    public IList<category> categories { get; set; }
    public Property Property { get; set; }
  }
}
