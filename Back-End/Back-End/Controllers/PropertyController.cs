using Back_End.Data;
using Back_End.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

    [HttpGet("rent")]
    public IActionResult getRentProperties()
    {
      var rents = db.properties.Where(x => x.subCategoryId == 11 || x.subCategoryId == 12 || x.subCategoryId == 14 || x.subCategoryId == 16 || x.subCategoryId == 18).ToList();
      return Ok(rents);
    }

    [HttpGet("buy")]
    public IActionResult getBuyProperties()
    {
      var rents = db.properties.Where(x => x.subCategoryId == 10 || x.subCategoryId == 13 || x.subCategoryId == 15 || x.subCategoryId == 16 || x.subCategoryId == 17).ToList();
      return Ok(rents);
    }    


    [HttpGet("{id}")]
    public IActionResult getPropertyById(int id)
    {
      var property = db.properties.FirstOrDefault(p => p.id == id);
      return Ok(property);
    }

    [HttpGet("similer/{secondSubCategoryId}")]
    public IActionResult getSimilerProperty(int secondSubCategoryId)
    {
      var property = db.properties.Where(x => x.secondSubCategoryId == secondSubCategoryId).Take(4);
      return Ok(property);
    }

    [HttpPost("add-property")]
    public async Task<IActionResult> AddProperty(Property property)
    {
      try
      {
        db.properties.Add(property);
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
      List<string> pathList = new List<string>();
      pathList = path.Split(',').ToList();
      Console.WriteLine(pathList);
      try
      {
        foreach (var item in pathList)
        {
          string FullPath = Path.Combine(_hostEnv.ContentRootPath, "Resources/Images", item);
          if (System.IO.File.Exists(FullPath))
          {
            System.IO.File.Delete(FullPath);            
          }
          else
          {
            return NotFound();
          }
        }
        return Ok();
      }
      catch (Exception ex)
      {

        return StatusCode(500, $"Internal server error: {ex}");
      }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutTodoItem(int id, Property property)
    {
      if (id != property.id)
      {
        return BadRequest();
      }

      db.Entry(property).State = EntityState.Modified;

      try
      {
        await db.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!propertyExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }
    [HttpDelete("deleteProperty/{id}")]
    public IActionResult deleteProperty(int id)
    {
      var property = db.properties.Find(id);
      db.Remove(property);
      db.SaveChanges();
      return Ok(property);
    }

    private bool propertyExists(int id)
    {
      return db.properties.Any(e => e.id == id);
    }
  }
}
