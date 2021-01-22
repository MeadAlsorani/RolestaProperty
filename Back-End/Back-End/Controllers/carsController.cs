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
    [HttpGet]
    public async Task<ActionResult<IEnumerable<car>>> Getcars()
    {
      return await _context.cars.ToListAsync();
    }

    // GET: api/cars/5
    [HttpGet("{id}")]
    public async Task<ActionResult<car>> Getcar(int id)
    {
      var car = await _context.cars.FindAsync(id);

      if (car == null)
      {
        return NotFound();
      }

      return car;
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
