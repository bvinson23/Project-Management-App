using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_Management_App.Models
{
    public class ProjectNote
    {
        public int Id { get; set; }
        public int NoteId { get; set; }
        public int ProjectId { get; set; }
    }
}
