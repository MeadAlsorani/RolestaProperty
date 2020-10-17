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

    public DbSet<Property> properties { get; set; }
  }
}
