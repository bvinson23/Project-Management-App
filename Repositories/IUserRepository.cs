using Project_Management_App.Models;
using System.Collections.Generic;

namespace Project_Management_App.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);
        User CheckUnique(User user);
        void Delete(int id);
        List<User> GetAllUsers();
        User GetByFirebaseUserId(string firebaseUserId);
        User GetUserById(int id);
        void Update(User user);
    }
}