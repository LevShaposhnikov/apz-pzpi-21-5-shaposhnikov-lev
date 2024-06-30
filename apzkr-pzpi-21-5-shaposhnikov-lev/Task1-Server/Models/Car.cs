namespace CarRent.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public string VIN { get; set; }
        public string LicensePlate { get; set; }
        public string Color { get; set; }
        public string Transmission { get; set; }
        public int LocationX { get; set; }
        public int LocationY { get; set; }
    }
}
