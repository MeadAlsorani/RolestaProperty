using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace Back_End.Models
{
  public class filter
  {

    public pagination pagination { get; set; }
    public sort sort { get; set; }
    [AllowNull]
    public Dictionary<string, filterObject> filters { get; set; }
  }

  public class filterObject
  {
    public string singleValue { get; set; }
    public string valueFrom { get; set; }
    public string valueTo { get; set; }
  }

  public class sort
  {
    public string sortBy { get; set; }
    public bool isAsec { get; set; }
  }
  public class pagination
  {
    public int pageSize { get; set; }
    public int pageNumber { get; set; }    
  }

  public class QueryResult<T>
  {
    public int totalRecors { get; set; }
    public int filteredRecords { get; set; }
    public IEnumerable<T> records { get; set; }
  }
}
