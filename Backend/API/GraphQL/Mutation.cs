using Core.Entities;
using Core.Interfaces;
using Core.Models;
using HotChocolate.Authorization;

namespace API.GraphQL
{
    public class Mutation
    {
        public async Task<Customer> AddorUpdateCustomer([Service] ICustomerService customerService, CustomerModel customer)
        {
            return await customerService.AddorUpdateCustomerAsync(customer);
        }
        public async Task<Order> AddorUpdateOrder([Service] IOrderService orderService, OrderModel order)
        {
            try
            {
                return await orderService.AddorUpdateOrderAsync(order);
            }
            catch
            {
                throw new Exception("Order cannot be updated");
            }
        }
        public async Task<bool> DeleteCustomer([Service] ICustomerService customerService, int customerId)
        {
            return await customerService.DeleteCustomerAsync(customerId);
        }
        public async Task<bool> DeleteOrder([Service] IOrderService orderService, int orderId)
        {
            return await orderService.DeleteOrderAsync(orderId);
        }
    }
}