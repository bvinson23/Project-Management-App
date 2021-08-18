using Project_Management_App.Models;
using System.Collections.Generic;

namespace Project_Management_App.Repositories
{
    public interface ITaskRepository
    {
        void AddTask(TaskObject task);
        void DeleteTask(int taskId);
        List<TaskObject> GetAllUserTasks(string firebaseUserId);
        TaskObject GetTaskById(int id);
        void UpdateTask(TaskObject task);
    }
}