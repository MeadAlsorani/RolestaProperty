using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back_End.Data;
using Back_End.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_End.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class heatingController : ControllerBase
  {
    private readonly DataContext _context;
    public heatingController(DataContext context)
    {
      this._context = context;
    }
    // GET: api/heating
    [HttpGet]
    public async Task<ActionResult<IEnumerable<heating>>> GetHeatings()
    {
      var heatings = _context.heatings.ToListAsync();
      return await heatings;
    }

    // GET: api/heating/5
    [HttpGet("{id}")]
    public async Task<ActionResult<heating>> GetHeatingById(int id)
    {
      var heating = await _context.heatings.FindAsync(id);

      if (heating == null)
      {
        return NotFound();
      }

      return  heating;
    }

    // POST: api/heating
    [HttpPost]
    public async Task<IActionResult> PostHeating(heating heating)
    {
      try
      {
        _context.heatings.Add(heating);
        await _context.SaveChangesAsync();
        return  Ok(heating);
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"internel error: {ex}");
      }
    }

    // PUT: api/heating/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutHeating(int id, heating heating)
    {
      if (id != heating.id)
      {
        return BadRequest();
      }

      _context.Entry(heating).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException ex)
      {
        if (!heatingExists(id))
        {
          return NotFound();
        }
        else
        {
          return StatusCode(500, $"internel error: {ex}");
        }
      }

      return NoContent();
    }

    // DELETE: api/ApiWithActions/5
    [HttpDelete("{id}")]    
    public async Task<ActionResult<heating>> DeleteHeating(int id)
    {
      var heating = await _context.heatings.FindAsync(id);
      if (heating == null)
      {
        return NotFound();
      }

      _context.heatings.Remove(heating);
      await _context.SaveChangesAsync();

      return heating;
    }

    private bool heatingExists(int id)
    {
      return _context.heatings.Any(e => e.id == id);
    }
  }
}
