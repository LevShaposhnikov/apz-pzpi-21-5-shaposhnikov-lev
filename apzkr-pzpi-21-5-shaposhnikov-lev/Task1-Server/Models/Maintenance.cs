using System;

namespace CarRent.Models
{
    public class Maintenance
    {
        public int Id { get; set; }
        public int CarId { get; set; }
        public Car Car { get; set; }
        public DateTime MaintenanceDate { get; set; }
        public string Description { get; set; }
        public decimal Cost { get; set; }
        public string ServiceCenter { get; set; }
        public int Mileage { get; set; }
        public bool IsCompleted { get; set; }
    }
}
