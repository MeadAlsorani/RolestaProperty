using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Back_End.Data;
using Back_End.Models;
using System.IO;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Hosting;
using System.Linq.Expressions;
using Back_End.Extensions;

namespace Back_End.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class carsController : ControllerBase
  {
    private readonly DataContext _context;
    private IWebHostEnvironment _hostEnv;

    public carsController(DataContext context,IWebHostEnvironment hostEnv)
    {
      _context = context;
      _hostEnv = hostEnv;
    }

    // GET: api/cars
    [HttpPost("getAllCars")]
    public async Task<QueryResult<car>> Getcars([FromBody]filter filter)
    {
      QueryResult<car> queryResult = new QueryResult<car>();
      var columnsMap = new Dictionary<string, Expression<Func<car, object>>>()
      {
        ["modelYear"] = a => a.modelYear,
        ["lostAmount"] = p => p.lostAmount,
        ["price"] = n => n.price,
        ["id"] = d => d.id
      };
      var cars=_context.cars
        .Include(x => x.carCompany)
        .AsQueryable();
      queryResult.totalRecors = await cars.CountAsync();
      if (filter.filters.Keys.Count > 0)
      {
        cars = ExtensionMethods.Carsfiltering(filter.filters, cars);
      }
      if (filter.sort.sortBy != null)
      {
        cars = ExtensionMethods.ApplySorting(cars, filter.sort, columnsMap);
      }
      queryResult.filteredRecords = await cars.CountAsync();
      cars = ExtensionMethods.ApplyPaging(cars, filter.pagination);

      queryResult.records = await cars.ToListAsync();
      return queryResult;
    }

    // GET: api/cars/5
    [HttpGet("{id}")]
    public async Task<ActionResult<car>> Getcar(int id)
    {
      var car = await _context.cars
        .Include(x=>x.carCompany)
        .FirstOrDefaultAsync(y=>y.id==id);

      if (car == null)
      {
        return NotFound();
      }

      return car;
    }
    [HttpGet("last/{lastAmount}")]
    public IActionResult getLastCars(int lastAmount)
    {
      var cars = _context.cars.OrderByDescending(x => x.id).Take(lastAmount);
      return Ok(cars);
    }
    [HttpPost("carsForRent")]
    public async Task<QueryResult<car>> GetRentCars([FromBody]filter filter)
    {
      QueryResult<car> queryResult = new QueryResult<car>();
      var rents =  _context.cars
        .Where(x=>x.isRent==true)
        .Include(x => x.carCompany)
        .AsQueryable();
      queryResult.totalRecors = await rents.CountAsync();
      var columnsMap = new Dictionary<string, Expression<Func<car, object>>>()
      {
        ["modelYear"] = a => a.modelYear,
        ["lostAmount"] = p => p.lostAmount,
        ["price"] = n => n.price,
        ["id"] = d => d.id
      };
      if (filter.filters.Keys.Count > 0)
      {
        rents = ExtensionMethods.Carsfiltering(filter.filters, rents);
      }
      if (filter.sort.sortBy != null)
      {
        rents = ExtensionMethods.ApplySorting(rents, filter.sort, columnsMap);
      }
      queryResult.filteredRecords = await rents.CountAsync();
      rents = ExtensionMethods.ApplyPaging(rents, filter.pagination);

      queryResult.records = await rents.ToListAsync();
      return queryResult;
    }

    [HttpPost("carsForSale")]
    public async Task<QueryResult<car>> GetBuyCars([FromBody]filter filter)
    {
      var buys =  _context.cars
        .Where(x => x.isRent == false)
        .Include(x=>x.carCompany)
        .AsQueryable();
      QueryResult<car> queryResult = new QueryResult<car>();
      
      queryResult.totalRecors = await buys.CountAsync();
      var columnsMap = new Dictionary<string, Expression<Func<car, object>>>()
      {
        ["modelYear"] = a => a.modelYear,
        ["lostAmount"] = p => p.lostAmount,
        ["price"] = n => n.price,
        ["id"] = d => d.id
      };
      if (filter.filters.Keys.Count > 0)
      {
        buys = ExtensionMethods.Carsfiltering(filter.filters, buys);
      }
      if (filter.sort.sortBy != null)
      {
        buys = ExtensionMethods.ApplySorting(buys, filter.sort, columnsMap);
      }
      queryResult.filteredRecords = await buys.CountAsync();
      buys = ExtensionMethods.ApplyPaging(buys, filter.pagination);

      queryResult.records = await buys.ToListAsync();
      return queryResult;
    }

    // PUT: api/cars/5
    // To protect from overposting attacks, enable the specific properties you want to bind to, for
    // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
    [HttpPut("{id}")]
    public async Task<IActionResult> Putcar(int id, car car)
    {
      if (id != car.id)
      {
        return BadRequest();
      }

      _context.Entry(car).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!carExists(id))
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

    // POST: api/cars
    // To protect from overposting attacks, enable the specific properties you want to bind to, for
    // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
    [HttpPost]
    public async Task<ActionResult<car>> Postcar(car car)
    {
      _context.cars.Add(car);
      await _context.SaveChangesAsync();

      return CreatedAtAction("Getcar", new { id = car.id }, car);
    }

    // DELETE: api/cars/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<car>> Deletecar(int id)
    {
      var car = await _context.cars.FindAsync(id);
      if (car == null)
      {
        return NotFound();
      }

      _context.cars.Remove(car);
      await _context.SaveChangesAsync();

      return car;
    }

    private bool carExists(int id)
    {
      return _context.cars.Any(e => e.id == id);
    }

    [HttpPost("fileUpload"), DisableRequestSizeLimit]
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
                  "Resources", "cars")).Root + $@"\{newFileName}";
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
      try
      {
        foreach (var item in pathList)
        {
          string FullPath = Path.Combine(_hostEnv.ContentRootPath, "Resources/cars", item);
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
  }
}
