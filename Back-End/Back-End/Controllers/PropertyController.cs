using Back_End.Data;
using Back_End.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Back_End.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PropertyController : ControllerBase
  {
    private readonly DataContext db;

    public PropertyController(DataContext db)
    {
      this.db = db;
    }

    [HttpGet]
    public IActionResult getAllProperties()
    {
      return Ok(db.properties.ToList());
    }

    [HttpGet("{id}")]
    public IActionResult getPropertyById(int id)
    {
      var property = db.properties.Find(id);
      return Ok(property);
    }

    [HttpPut]
    public IActionResult AddProperty(Property property)
    {
      return Ok(db.properties.Add(property));
    }

    [HttpDelete("deleteProperty/{id}")]
    public IActionResult deleteProperty(int id)
    {
      var property = db.properties.Find(id);
      return Ok(db.Remove(property));
    }
  }
}
