using Api.Data;
using Api.Entities;
using Api.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAll(string orderBy, string searchTerm)
        {
            var query = _context.Products
                .Sort(orderBy)
                .Search(searchTerm)
                .AsQueryable();

            return await query.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();

            return product;
        }
    }
}