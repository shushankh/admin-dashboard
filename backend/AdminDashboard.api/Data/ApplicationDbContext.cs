using AdminDashboard.api.Models;
using Microsoft.EntityFrameworkCore;

namespace AdminDashboard.api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
}