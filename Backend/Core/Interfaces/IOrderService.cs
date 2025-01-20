using Core.Entities;
using Core.Models;

namespace Core.Interfaces
{
    public interface IOrderService
    {
        IQueryable<Order> GetOrders();
        Task<Order> AddorUpdateOrderAsync(OrderModel orderModel);
    }
}