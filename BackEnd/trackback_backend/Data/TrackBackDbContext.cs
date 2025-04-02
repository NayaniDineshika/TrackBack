using Microsoft.EntityFrameworkCore;
using trackback_backend.Models;

public class TrackBackDbContext : DbContext
{
    public TrackBackDbContext(DbContextOptions<TrackBackDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; } // Table for users
}
