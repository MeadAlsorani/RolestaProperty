using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back_End.Models
{
  public class carCompany
  {
    public int id { get; set; }

    public string companyName { get; set; }

    public IList<car> cars { get; set; }
  }
}
