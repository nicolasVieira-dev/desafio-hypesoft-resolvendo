namespace Hypesoft.Domain.Entities;

public class Product
{
    public Guid Id {get; private set;} = Guid.NewGuid();

    public string Name {get; private set;} = default!; 
    public string Description {get; private set;} = default!; 
    public decimal Price {get; private set;} 
public string CategoryId { get; private set; } = default!;
public int StockQuantity { get; private set; }

    private Product() {} 

public Product(string name, string description, decimal price, string categoryId, int stockQuantity)
{
    Name = name.Trim();
    Description = description.Trim();
    Price = price;
    CategoryId = categoryId.Trim();
    StockQuantity = stockQuantity;
}

    public void Update(string name, string description, string category, decimal price)
    {
        Name = name.Trim();
        Description = description.Trim();
        Price = price;
        CategoryId = category.Trim();
    }

    public void UpdateStock(int stock)
    {
        StockQuantity = stock;
    }
 }