using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Entities;
using Core.Models;

namespace Core.MappingProfiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CustomerModel, Customer>()
            .ForMember(
        dest => dest.Address,
        opt => opt.MapFrom(src => new Address
        {
            AddressLine1 = src.AddressLine1,
            AddressLine2 = src.AddressLine2,
            City = src.City,
            State = src.State,
            Country = src.Country
        })
    ); ;
            CreateMap<OrderModel, Order>();
        }
    }
}