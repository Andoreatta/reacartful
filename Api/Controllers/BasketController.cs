using Api.Data;
using Api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasket()
        {
            Basket basket = await RetrieveBasket();
            if (basket == null) return NotFound();

            return Ok(basket);
        }

        [HttpPost]  // api/basket?productId=1&quantity=5
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) basket = CreateBasket();
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();
            basket.AddItem(product, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return StatusCode(201);

            return BadRequest(new ProblemDetails { Title = "Problem adding item to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItemFromBasket(int productId, int quantity)
        {
            return Ok();
        }

        // ------------------------ Private Methods ------------------------

        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                .Include(item => item.Items)
                .ThenInclude(product => product.Product)
                .FirstOrDefaultAsync(user => user.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30),
            };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);

            return basket;
        }
    }
}