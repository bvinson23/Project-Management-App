using Project_Management_App.Models;
using System.Collections.Generic;

namespace Project_Management_App.Repositories
{
    public interface IProjectRepository
    {
        void AddProject(Project project);
        void DeleteProject(int projectId);
        List<Project> GetAllUserProjects(string firebaseUserId);
        Project GetProjectById(int id);
        void UpdateProject(Project project);
    }
}