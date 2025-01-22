using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly IDbContextFactory<OMAContext> _contextFactory;
        private readonly IMapper mapper;

        public CustomerService(IDbContextFactory<OMAContext> contextFactory, IMapper mapper)
        {
            _contextFactory = contextFactory;
            this.mapper = mapper;
        }

        public IQueryable<Customer> GetCustomersAndOrders()
        {
            var context = _contextFactory.CreateDbContext();
            context.Database.EnsureCreated();
            return context.Customers
            .Where(c => !c.IsDeleted)
            .Include(c => c.Orders.Where(o => !o.IsDeleted))
            .Include(c => c.Address);
        }
        public async Task<Customer> AddorUpdateCustomerAsync(CustomerModel customerModel)
        {
            var context = _contextFactory.CreateDbContext();
            Customer customer;
            if (customerModel.Id == null)
            {
                customer = mapper.Map<Customer>(customerModel);
                await context.Customers.AddAsync(customer);
            }
            else
            {
                customer = await context.Customers.Where(c => c.Id == customerModel.Id)
                .Include(c => c.Address)
                .FirstOrDefaultAsync();
                if (customer == null)
                {
                    throw new Exception("Customer not found");
                }
                mapper.Map(customerModel, customer);
            }
            await context.SaveChangesAsync();
            return customer;
        }

        public async Task<bool> DeleteCustomerAsync(int customerId)
        {
            var context = _contextFactory.CreateDbContext();
            var customer = await context.Customers.Where(c => c.Id == customerId).FirstOrDefaultAsync();
            if (customer == null)
            {
                throw new Exception($"Customer with id: {customerId} was not found");
            }
            customer.IsDeleted = true;
            var orders = await context.Orders.Where(o => o.CustomerId == customerId).ToListAsync();
            foreach (var order in orders)
            {
                order.IsDeleted = true;
            }
            context.Customers.Update(customer);
            context.Orders.UpdateRange(orders);
            return await context.SaveChangesAsync() > 0;
        }
    }
}