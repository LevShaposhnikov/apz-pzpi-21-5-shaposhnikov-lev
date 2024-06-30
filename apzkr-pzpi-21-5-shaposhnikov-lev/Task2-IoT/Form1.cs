using App.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace App
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            var id = int.Parse(numericUpDown1.Value.ToString());
            var x = int.Parse(numericUpDown2.Value.ToString());
            var y = int.Parse(numericUpDown3.Value.ToString());

            var model = new Position()
            {
                Id = id,
                LocationX = x,
                LocationY = y,
            };

            using (var client = new HttpClient())
            {
                string url = "https://localhost:5001/api/Cars/" + id;
                var json = JsonSerializer.Serialize(model);

                var content = new StringContent(json, Encoding.UTF8, "application/json");
                var request = new HttpRequestMessage(new HttpMethod("PATCH"), url) { Content = content };

                try
                {
                    var response = client.SendAsync(request).Result;
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Error. Message: " + ex.Message);
                }
            }
        }
    }
}
