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
  public class typeController : ControllerBase
  {
    private readonly DataContext _context;
    public typeController(DataContext context)
    {
      this._context = context;
    }
    // GET: api/type
    [HttpGet]
    public async Task<ActionResult<IEnumerable<type>>> GetTypes()
    {
      var types = _context.types.ToListAsync();
      return await types ;
    }

    // GET: api/type/5
    [HttpGet("{id}")]
    public async Task<ActionResult<type>> GetTypeById(int id)
    {
      var type = await _context.types.FindAsync(id);

      if (type == null)
      {
        return NotFound();
      }
      return  type;
    }

    // POST: api/type
    [HttpPost]
    public async Task<IActionResult> PostType(type type)
    {
      try
      {
        _context.types.Add(type);
        await _context.SaveChangesAsync();
        return Ok(type);
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"internel error: {ex}");
      }
    }

    // PUT: api/type/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutType(int id, type type)
    {
      if (id != type.id)
      {
        return BadRequest();
      }

      _context.Entry(type).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException ex)
      {
        if (!typeExists(id))
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
    public async Task<ActionResult<type>> DeleteType(int id)
    {
      var type = await _context.types.FindAsync(id);
      if (type == null)
      {
        return NotFound();
      }

      _context.types.Remove(type);
      await _context.SaveChangesAsync();

      return type;
    }

    private bool typeExists(int id)
    {
      return _context.types.Any(e => e.id == id);
    }
  }
}
