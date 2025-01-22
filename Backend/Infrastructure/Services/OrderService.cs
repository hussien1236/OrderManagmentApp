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
    public class OrderService : IOrderService
    {
        private readonly IDbContextFactory<OMAContext> _contextFactory;
        private readonly IMapper mapper;

        public OrderService(IDbContextFactory<OMAContext> contextFactory, IMapper mapper)
        {
            _contextFactory = contextFactory;
            this.mapper = mapper;
        }

        public IQueryable<Order> GetOrders()
        {
            var context = _contextFactory.CreateDbContext();
            context.Database.EnsureCreated();
            return context.Orders
            .Where(o => !o.IsDeleted)
            .Include(o => o.Customer);
        }
        public async Task<Order> AddorUpdateOrderAsync(OrderModel orderModel)
        {
            var context = _contextFactory.CreateDbContext();
            Order order;
            var customer = await context.Customers.Where(c => c.Id == orderModel.CustomerId).FirstOrDefaultAsync();
            if (customer == null)
            {
                throw new Exception($"Customer with {orderModel.CustomerId} was not found");
            }
            if (orderModel.Id == null)
            {
                order = mapper.Map<Order>(orderModel);
                await context.Orders.AddAsync(order);
            }
            else
            {
                order = await context.Orders.Where(o => o.Id == orderModel.Id).FirstOrDefaultAsync();
                if (order == null)
                {
                    throw new Exception("Order not found");
                }
                mapper.Map(orderModel, order);
            }
            await context.SaveChangesAsync();
            return order;
        }

        public async Task<bool> DeleteOrderAsync(int orderId)
        {
            var context = _contextFactory.CreateDbContext();
            var order = await context.Orders.Where(o => o.Id == orderId).FirstOrDefaultAsync();
            if (order == null)
            {
                throw new Exception($"Order with id: {orderId} was not found");
            }
            order.IsDeleted = true;
            context.Orders.Update(order);
            return await context.SaveChangesAsync() > 0;
        }
    }
}