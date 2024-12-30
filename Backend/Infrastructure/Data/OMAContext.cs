using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Enums;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class OMAContext : DbContext
    {
        public OMAContext(DbContextOptions<OMAContext> options) : base(options)
        {

        }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Address> Addresses { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>().HasData(
                new Customer
                {
                    Id = 1,
                    FirstName = "paul",
                    LastName = "bond",
                    ContactNumber = "03451234",
                    IsDeleted = false,
                    Email = "paulbond@gmail.com"
                },
                new Customer
                {
                    Id = 2,
                    FirstName = "peter",
                    LastName = "peter",
                    ContactNumber = "04551234",
                    IsDeleted = false,
                    Email = "peterpeter@gmail.com"
                }
                );
            modelBuilder.Entity<Address>().HasData(
                new Address
                {
                    Id = 1,
                    CustomerId = 1,
                    AddressLine1 = "APlace",
                    AddressLine2 = "AnotherPlace",
                    City = "Beirut",
                    State = "Beirut",
                    Country = "Lebanon"
                },
                new Address
                {
                    Id = 2,
                    CustomerId = 2,
                    AddressLine1 = "APlace",
                    AddressLine2 = "AnotherPlace",
                    City = "Beirut",
                    State = "Beirut",
                    Country = "Lebanon"
                }
            );
            modelBuilder.Entity<Order>().HasData(
                new Order
                {
                    Id = 1,
                    CustomerId = 1,
                    OrderDate = new DateTime(2024, 12, 18),
                    Description = "New Item",
                    TotalAmount = 500,
                    DepositAmount = 10,
                    IsDelivery = true,
                    Status = Status.PENDING,
                    OtherNotes = "Something new",
                    IsDeleted = false
                },
                new Order
                {
                    Id = 2,
                    CustomerId = 2,
                    OrderDate = new DateTime(2024, 11, 18),
                    Description = "Another New Item",
                    TotalAmount = 5000,
                    DepositAmount = 250,
                    IsDelivery = false,
                    Status = Status.DRAFT,
                    OtherNotes = "Something new again",
                    IsDeleted = false
                }
            );
        }
    }
}