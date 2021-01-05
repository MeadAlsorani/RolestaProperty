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
    public class SecondSubCategoriesController : ControllerBase
    {
        private readonly DataContext _context;

        public SecondSubCategoriesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/SecondSubCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SecondSubCategory>>> GetSecondSubCategories()
        {
            return await _context.SecondSubCategories.ToListAsync();
        }

        // GET: api/SecondSubCategories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SecondSubCategory>> GetSecondSubCategory(int id)
        {
            var secondSubCategory = await _context.SecondSubCategories.FindAsync(id);

            if (secondSubCategory == null)
            {
                return NotFound();
            }

            return secondSubCategory;
        }

        // PUT: api/SecondSubCategories/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSecondSubCategory(int id, SecondSubCategory secondSubCategory)
        {
            if (id != secondSubCategory.id)
            {
                return BadRequest();
            }

            _context.Entry(secondSubCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SecondSubCategoryExists(id))
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

        // POST: api/SecondSubCategories
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SecondSubCategory>> PostSecondSubCategory(SecondSubCategory secondSubCategory)
        {
            _context.SecondSubCategories.Add(secondSubCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSecondSubCategory", new { id = secondSubCategory.id }, secondSubCategory);
        }

        // DELETE: api/SecondSubCategories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SecondSubCategory>> DeleteSecondSubCategory(int id)
        {
            var secondSubCategory = await _context.SecondSubCategories.FindAsync(id);
            if (secondSubCategory == null)
            {
                return NotFound();
            }

            _context.SecondSubCategories.Remove(secondSubCategory);
            await _context.SaveChangesAsync();

            return secondSubCategory;
        }

        private bool SecondSubCategoryExists(int id)
        {
            return _context.SecondSubCategories.Any(e => e.id == id);
        }
    }
}
