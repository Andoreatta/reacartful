using Api.Data;
using Api.DTOs;
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

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            Basket basket = await RetrieveBasket();
            if (basket == null) return NotFound();

            return MapBasketToDto(basket);
        }

        [HttpPost]  // api/basket?productId=3&quantity=5
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) basket = CreateBasket();
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();
            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));
            return BadRequest(new ProblemDetails { Title = "Problem adding item to basket" });
        }

        [HttpDelete]  // api/basket?productId=3&quantity=5
        public async Task<ActionResult> RemoveItemFromBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();

            basket.RemoveItem(productId, quantity);
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem removing item from basket" });
        }

        // ------------------------ Private Methods ------------------------

        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.Product.Id,
                    ProductName = item.Product.Name,
                    ProductBrand = item.Product.Brand,
                    ProductType = item.Product.Type,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Quantity = item.Quantity
                }).ToList()
            };
        }

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