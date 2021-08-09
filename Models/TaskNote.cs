using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_Management_App.Models
{
    public class TaskNote
    {
        public int Id { get; set; }
        public int TaskId { get; set; }
        public int NoteId { get; set; }
    }
}
