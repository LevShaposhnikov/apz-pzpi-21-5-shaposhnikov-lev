using System;
using System.Collections.Generic;

namespace CarRent.Models
{
    public class Rental
    {
        public int Id { get; set; }
        public Car Car { get; set; }
        public int CarId { get; set; }
        public Customer Customer { get; set; }
        public int CustomerId { get; set; }
        public DateTime RentalStartDate { get; set; }
        public DateTime RentalEndDate { get; set; }
        public bool IsActive { get; set; }
        public int RentalCost { get; set; } // per hour
        public int MileageStart { get; set; }
        public int MileageEnd { get; set; }
        public List<Feedback> Feedbacks {  get; set; }
    }
}
