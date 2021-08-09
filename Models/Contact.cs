using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_Management_App.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Phone { get; set; }
        public string Email { get; set; }
        public string Title { get; set; }
        public string Company { get; set; }
    }
}
