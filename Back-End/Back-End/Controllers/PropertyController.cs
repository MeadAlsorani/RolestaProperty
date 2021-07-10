using Back_End.Data;
using Back_End.Extensions;
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
using System.Linq.Expressions;
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

    [HttpPost("GetProperties")]
    public async Task<QueryResult<Property>> getAllProperties(filter filter)
    {
      QueryResult<Property> queryResult=new QueryResult<Property>();
      var columnsMap = new Dictionary<string, Expression<Func<Property, object>>>() {
        ["area"]= a=>a.area,
        ["Price"]= p=>p.Price,
        ["NoOfRooms"]=n=>n.NoOfRooms,
        ["date"]=d=>d.date
      };
      var properties = db.properties
        .Include(x => x.category)
        .Include(y => y.subCategory)
        .Include(z => z.SecondSubCategory)
        .Include(e => e.heating)
        .Include(e => e.type)
        .AsQueryable();
      queryResult.totalRecors =await properties.CountAsync();

      if (filter.filters.Keys.Count>0)
      {
        properties= ExtensionMethods.RealStatefiltering(filter.filters, properties);
      }
      if (filter.sort.sortBy!=null)
      {
          properties = ExtensionMethods.ApplySorting(properties, filter.sort, columnsMap);        
      }
      queryResult.filteredRecords = await properties.CountAsync();
      properties = ExtensionMethods.ApplyPaging(properties, filter.pagination);
      
      queryResult.records =await properties.ToListAsync();
      return  (queryResult);
    }

    [HttpPost("rent")]
    public async Task<QueryResult<Property>> getRentProperties(filter filter)
    {
      QueryResult<Property> queryResult = new QueryResult<Property>();
      var columnsMap = new Dictionary<string, Expression<Func<Property, object>>>()
      {
        ["area"] = a => a.area,
        ["Price"] = p => p.Price,
        ["NoOfRooms"] = n => n.NoOfRooms,
        ["date"] = d => d.date
      };
      var rents = db.properties
        .Include(x => x.category)
        .Include(y => y.subCategory)
        .Include(z => z.SecondSubCategory)
        .Include(e => e.heating)
        .Include(e => e.type)
        .Where(x => x.subCategoryId == 11
        || x.subCategoryId == 12
        || x.subCategoryId == 14
        || x.subCategoryId == 16
        || x.subCategoryId == 18)
        .AsQueryable();

      queryResult.totalRecors = await rents.CountAsync();

      if (filter.filters.Keys.Count > 0)
      {
        rents = ExtensionMethods.RealStatefiltering(filter.filters, rents);
      }
      if (filter.sort.sortBy != null)
      {
        rents = ExtensionMethods.ApplySorting(rents, filter.sort, columnsMap);
      }
      queryResult.filteredRecords = await rents.CountAsync();
      rents = ExtensionMethods.ApplyPaging(rents, filter.pagination);

      queryResult.records = await rents.ToListAsync();
      return (queryResult);
    }

    [HttpPost("buy")]
    public async Task<QueryResult<Property>> getBuyProperties([FromBody]filter filter)
    {
      QueryResult<Property> queryResult = new QueryResult<Property>();
      var columnsMap = new Dictionary<string, Expression<Func<Property, object>>>()
      {
        ["area"] = a => a.area,
        ["Price"] = p => p.Price,
        ["NoOfRooms"] = n => n.NoOfRooms,
        ["date"] = d => d.date
      };
      var buy = db.properties
        .Include(x => x.category)
        .Include(y => y.subCategory)
        .Include(z => z.SecondSubCategory)
        .Include(e => e.heating)
        .Include(e => e.type)
        .Where(x => x.subCategoryId == 10
        || x.subCategoryId == 13
        || x.subCategoryId == 15
        || x.subCategoryId == 16
        || x.subCategoryId == 17)
        .AsQueryable();
      queryResult.totalRecors = await buy.CountAsync();

      if (filter.filters.Keys.Count > 0 || filter.filters!=null)
      {
        buy = ExtensionMethods.RealStatefiltering(filter.filters, buy);
      }
      if (filter.sort.sortBy != null)
      {
        buy = ExtensionMethods.ApplySorting(buy, filter.sort, columnsMap);
      }
      queryResult.filteredRecords = await buy.CountAsync();
      buy = ExtensionMethods.ApplyPaging(buy, filter.pagination);

      queryResult.records = await buy.ToListAsync();
      return queryResult;
    }    


    [HttpGet("{id}")]
    public IActionResult getPropertyById(int id)
    {
      var property = db.properties
        .Include(x => x.category)
        .Include(y => y.subCategory)
        .Include(z => z.SecondSubCategory)
        .Include(e => e.heating)
        .Include(e => e.type)
        .FirstOrDefault(p => p.id == id);
      return Ok(property);
    }


    [HttpGet("last/{lastAmount}")]
    public IActionResult getLastProperties(int lastAmount)
    {
      var property = db.properties
        .Include(x => x.category)
        .Include(y => y.subCategory)
        .Include(z => z.SecondSubCategory)
        .Include(e => e.heating)
        .Include(e => e.type)
        .OrderByDescending(x => x.id).Take(lastAmount);
      return Ok(property);
    }

    [HttpGet("similer/{secondSubCategoryId}")]
    public IActionResult getSimilerProperty(int secondSubCategoryId)
    {
      var property = db.properties
        .Where(x => x.secondSubCategoryId == secondSubCategoryId)
        .Include(x => x.category)
        .Include(y => y.subCategory)
        .Include(z => z.SecondSubCategory)
        .Include(e => e.heating)
        .Include(e => e.type)
        .Take(4);
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
