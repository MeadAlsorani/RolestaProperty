using Back_End.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back_End.Data
{
  public class DataContext :DbContext
  {
    public DataContext(DbContextOptions<DataContext> options):base(options)   {}
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Property>()
            .Property(e => e.Image)
            .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));
      modelBuilder.Entity<car>()
           .Property(e => e.pictures)
           .HasConversion(
               v => string.Join(',', v),
               v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));
    }
    public DbSet<Property> properties { get; set; }
    public DbSet<user> users { get; set; }
    public DbSet<heating> heatings { get; set; }
    public DbSet<type> types { get; set; }
    public DbSet<carousel> carousels { get; set; }
    public DbSet<car> cars { get; set; }
    public DbSet<category> categories { get; set; }
    public DbSet<subCategory> SubCategories { get; set; }
    public DbSet<SecondSubCategory> SecondSubCategories { get; set; }    
  }
}
