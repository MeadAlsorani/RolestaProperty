using Back_End.Data;
using Back_End.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

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
    public async Task<IActionResult> AddProperty(Property property)
    {
      System.Console.WriteLine("12");
      try
      {
        System.Console.WriteLine("123");        
          db.properties.Add(new Property
          {
            Name = property.Name,
            Price = property.Price,
            provience = property.provience,
            city = property.city,
            street = property.street,
            NoOfRooms = property.NoOfRooms,
            Type = property.Type,
            Description = property.Description,
            Image = property.Image
          });
          await db.SaveChangesAsync();
          return Ok(property);        
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"Internal server error: {ex}");
      }
    }

    [HttpPost, DisableRequestSizeLimit]
    public async Task<IActionResult> imageUpload()
    {
      try
      {
        var file = Request.Form.Files[0];
        var folderName = Path.Combine("Resources", "Images");
        var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
        if (file.Length > 0)
        {
          var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.ToString().Trim('"');
          var fullPath = Path.Combine(pathToSave, fileName);
          var dbPath = Path.Combine(folderName, fileName);

          using (var stream = new FileStream(fullPath, FileMode.Create))
          {
            await file.CopyToAsync(stream);
          }
          string test = Path.Combine( "http://localhost:5000/" , dbPath);
          return Ok(new {test });
        }
        else
        {
          return BadRequest();
        }
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"Internal server error: {ex}");
      }
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
