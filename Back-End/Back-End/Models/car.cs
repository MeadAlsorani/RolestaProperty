using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Back_End.Models
{
  public class car
  {
    public int id { get; set; }

    [Required]
    public int modelYear { get; set; }    

    [Required]
    public string modelName { get; set; }
    public string modelNameEn { get; set; }

    [Required]
    public bool isAuto { get; set; }

    public int lostAmount { get; set; }

    public bool isHeavy { get; set; }

    public string description { get; set; }
    public string descriptionTr { get; set; }
    public string descriptionEn { get; set; }
    [Required]
    public bool isRent { get; set; }

    [Required]
    public int price { get; set; }

    public string[] pictures { get; set; }

    public int carCompanyId { get; set; }
    public carCompany carCompany { get; set; }

  }
}
