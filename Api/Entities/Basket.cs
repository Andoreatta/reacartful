using System.Collections.Generic;

namespace Api.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            // Check if the product is already in the basket, if the product is not in the basket, add it
            if (Items.TrueForAll(item => item.ProductId != product.Id))
            {
                Items.Add(new BasketItem
                {
                    Product = product,
                    Quantity = quantity
                });
            }

            // Find the product in the basket, if the product is found, increase its quantity
            var existingItem = Items.Find(item => item.ProductId == product.Id);
            if (existingItem != null) existingItem.Quantity += quantity;
        }

        public void RemoveItem(int productId, int quantity)
        {
            // Find the product in the basket, if the product is found, decrease its quantity
            var existingItem = Items.Find(item => item.ProductId == productId);
            if (existingItem != null)
            {
                existingItem.Quantity -= quantity;
                if (existingItem.Quantity <= 0)
                {
                    Items.Remove(existingItem);
                }
            }
        }
    }
}