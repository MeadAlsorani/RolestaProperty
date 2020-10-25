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
      var properties = db.properties.ToList();
      return Ok(properties);
    }

    [HttpGet("{id}")]
    public IActionResult getPropertyById(int id)
    {
      var property = db.properties.Find(id);
      return Ok(property);
    }

    [HttpPost("add-property")]
    public IActionResult AddProperty([FromBody]Property property)
    {
      db.properties.Add(property);
      db.SaveChanges();
      return Ok(property);
    }

    [HttpDelete("deleteProperty/{id}")]
    public IActionResult deleteProperty(int id)
    {
      var property = db.properties.Find(id);
      db.Remove(property);
      db.SaveChanges();
      return Ok(property);
    }
  }
}
