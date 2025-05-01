using Microsoft.EntityFrameworkCore;
using trackback_backend.Models;

public class TrackBackDbContext : DbContext
{
    public TrackBackDbContext(DbContextOptions<TrackBackDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; } // Table for users
    public DbSet<ItemCategoryModel> ItemCategory { get; set; } // Table For Item Category
    public DbSet<LostItemModel> LostItems { get; set; }
    public DbSet<SubscriptionModel> Subscription { get; set; }
    public DbSet<FoundItemsModel> FoundItems { get; set; }
}
