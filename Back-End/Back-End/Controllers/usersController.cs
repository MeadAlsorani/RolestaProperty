using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Back_End.Data;
using Back_End.Models;

namespace Back_End.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class usersController : ControllerBase
  {
    private readonly DataContext _context;

    public usersController(DataContext context)
    {
      _context = context;
    }

    // GET: api/users
    [HttpGet]
    public async Task<ActionResult<IEnumerable<user>>> Getusers()
    {
      return await _context.users.ToListAsync();
    }

    // GET: api/users/5
    [HttpGet("{id}")]
    public async Task<ActionResult<user>> Getuser(int id)
    {
      var user = await _context.users.FindAsync(id);

      if (user == null)
      {
        return NotFound();
      }

      return user;
    }

    [HttpGet("getUser/{email}")]
    public async Task<ActionResult<user>> GetUserByEmail(string email)
    {
      var user = await _context.users.FirstOrDefaultAsync(x => x.userEmail == email);

      if (user == null)
      {
        return NotFound();
      }

      return user;
    }

    [HttpPost("login")]
    public ActionResult<user> Login([FromBody] user user)
    {
      var userCheck =  _context.users.FirstOrDefault(x => x.userEmail == user.userEmail && x.password == user.password);
      if (userCheck!=null)
      {
        return Ok(userCheck);
      }
      else
      {
        return NotFound();
      }
    }

    // PUT: api/users/5
    // To protect from overposting attacks, enable the specific properties you want to bind to, for
    // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
    [HttpPut("{id}")]
    public async Task<IActionResult> Putuser(int id, user user)
    {
      if (id != user.id)
      {
        return BadRequest();
      }

      _context.Entry(user).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!userExists(id))
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

    // POST: api/users
    // To protect from overposting attacks, enable the specific properties you want to bind to, for
    // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
    [HttpPost]
    public async Task<ActionResult<user>> Postuser(user user)
    {
      _context.users.Add(user);
      await _context.SaveChangesAsync();

      return CreatedAtAction("Getuser", new { id = user.id }, user);
    }

    // DELETE: api/users/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<user>> Deleteuser(int id)
    {
      var user = await _context.users.FindAsync(id);
      if (user == null)
      {
        return NotFound();
      }

      _context.users.Remove(user);
      await _context.SaveChangesAsync();

      return user;
    }

    private bool userExists(int id)
    {
      return _context.users.Any(e => e.id == id);
    }
  }
}
