using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back_End.Data;
using Back_End.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
      return Ok(this.db.properties.ToList());
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
      return Ok(this.db.properties.Add(property));
    }
  }
}
