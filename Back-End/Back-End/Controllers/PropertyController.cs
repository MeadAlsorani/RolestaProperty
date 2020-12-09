using Back_End.Data;
using Back_End.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
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
    private IWebHostEnvironment _hostEnv;    
    public PropertyController(DataContext db, IWebHostEnvironment env)
    {
      this.db = db;
      _hostEnv = env;
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
      try
      {
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
    public async Task<IActionResult> imageUpload(List<IFormFile> images)
    {
      List<string> imagesNames = new List<string>();
      try
      {
        if (images != null)
        {
          for (int i = 0; i < images.Count; i++)
          {
            if (images[i].Length > 0)
            {
              var fileName = Path.GetFileName(images[i].FileName);
              var myUniqueFileName = Convert.ToString(Guid.NewGuid());
              var fileExtension = Path.GetExtension(fileName);
              var newFileName = string.Concat(myUniqueFileName, fileExtension);
              var filePath =
                  new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(),
                  "Resources", "Images")).Root + $@"\{newFileName}";
              imagesNames.Add(newFileName);
              using (var stream = new FileStream(filePath, FileMode.Create))
              {
                await images[i].CopyToAsync(stream);
              }                            
            }            
          }
          return Ok(imagesNames);
        }
        else
        {
          return NotFound();
        }
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"internel error: {ex}");
      }

    }

    [HttpPost("file-delete")]
    public IActionResult deleteFile([FromForm]string path)
    {
      string FullPath = Path.Combine(_hostEnv.ContentRootPath, "Resources/Images", path);
      Console.WriteLine(FullPath);
      try
      {
        if (System.IO.File.Exists(FullPath))
        {

          System.IO.File.Delete(FullPath);
          return Ok();
        }
        else
        {
          return NotFound();
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
