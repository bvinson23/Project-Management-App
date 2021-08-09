using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_Management_App.Models
{
    public class ProjectContact
    {
        public int Id { get; set; }
        public int ContactId { get; set; }
        public int ProjectId { get; set; }
    }
}
