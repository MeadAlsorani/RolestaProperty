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
    public class carCompaniesController : ControllerBase
    {
        private readonly DataContext _context;

        public carCompaniesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/carCompanies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<carCompany>>> GetcarCompany()
        {
            return await _context.carCompany.ToListAsync();
        }

        // GET: api/carCompanies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<carCompany>> GetcarCompany(int id)
        {
            var carCompany = await _context.carCompany.FindAsync(id);

            if (carCompany == null)
            {
                return NotFound();
            }

            return carCompany;
        }

        // PUT: api/carCompanies/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutcarCompany(int id, carCompany carCompany)
        {
            if (id != carCompany.id)
            {
                return BadRequest();
            }

            _context.Entry(carCompany).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!carCompanyExists(id))
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

        // POST: api/carCompanies
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<carCompany>> PostcarCompany(carCompany carCompany)
        {
            _context.carCompany.Add(carCompany);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetcarCompany", new { id = carCompany.id }, carCompany);
        }

        // DELETE: api/carCompanies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<carCompany>> DeletecarCompany(int id)
        {
            var carCompany = await _context.carCompany.FindAsync(id);
            if (carCompany == null)
            {
                return NotFound();
            }

            _context.carCompany.Remove(carCompany);
            await _context.SaveChangesAsync();

            return carCompany;
        }

        private bool carCompanyExists(int id)
        {
            return _context.carCompany.Any(e => e.id == id);
        }
    }
}
