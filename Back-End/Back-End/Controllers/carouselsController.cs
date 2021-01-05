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
  public class carouselsController : ControllerBase
  {
    private readonly DataContext _context;
    private IWebHostEnvironment _hostEnv;
    public carouselsController(DataContext context, IWebHostEnvironment hostEnv)
    {
      _context = context;
      _hostEnv = hostEnv;
    }

    // GET: api/carousels
    [HttpGet]
    public async Task<ActionResult<IEnumerable<carousel>>> Getcarousels()
    {
      return await _context.carousels.ToListAsync();
    }

    // GET: api/carousels/5
    [HttpGet("{id}")]
    public async Task<ActionResult<carousel>> Getcarousel(int id)
    {
      var carousel = await _context.carousels.FindAsync(id);

      if (carousel == null)
      {
        return NotFound();
      }

      return carousel;
    }

    // PUT: api/carousels/5
    // To protect from overposting attacks, enable the specific properties you want to bind to, for
    // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
    [HttpPut("{id}")]
    public async Task<IActionResult> Putcarousel(int id, carousel carousel)
    {
      if (id != carousel.id)
      {
        return BadRequest();
      }

      _context.Entry(carousel).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!carouselExists(id))
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

    // POST: api/carousels
    // To protect from overposting attacks, enable the specific properties you want to bind to, for
    // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
    [HttpPost]
    public async Task<ActionResult<carousel>> Postcarousel(carousel carousel)
    {
      _context.carousels.Add(carousel);
      await _context.SaveChangesAsync();

      return CreatedAtAction("Getcarousel", new { id = carousel.id }, carousel);
    }

    // DELETE: api/carousels/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<carousel>> Deletecarousel(int id)
    {
      var carousel = await _context.carousels.FindAsync(id);
      if (carousel == null)
      {
        return NotFound();
      }

      _context.carousels.Remove(carousel);
      await _context.SaveChangesAsync();

      return carousel;
    }

    private bool carouselExists(int id)
    {
      return _context.carousels.Any(e => e.id == id);
    }

    [HttpPost("image-upload"), DisableRequestSizeLimit]
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
                  "Resources", "carousel")).Root + $@"\{newFileName}";
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
          string FullPath = Path.Combine(_hostEnv.ContentRootPath, "Resources/carousel", item);
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
