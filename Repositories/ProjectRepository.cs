using HealthNut.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Project_Management_App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_Management_App.Repositories
{
    public class ProjectRepository : BaseRepository
    {
        public ProjectRepository(IConfiguration configuration) : base(configuration) { }

        public List<Project> GetAllUserProjects(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.[Name], p.UserId
                        FROM Project p
                        JOIN User u ON u.Id = p.UserId
                        WHERE u.FirebaseUserId = @FirebaseUserId
                    ";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);
                    var reader = cmd.ExecuteReader();
                    List<Project> projects = new List<Project>();
                    while (reader.Read())
                    {
                        projects.Add(NewProjectFromDb(reader));
                    };

                    conn.Close();

                    return projects;
                }
            }
        }

        public Project GetProjectById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name], UserId
                        FROM Project
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Project project = null;
                    while (reader.Read())
                    {
                        if (project == null)
                        {
                            project = NewProjectFromDb(reader);
                        }
                    }

                    reader.Close();

                    return project;
                }
            }
        }

        public void AddProject(Project project)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Project (Name, UserId)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @UserId)
                    ";

                    DbUtils.AddParameter(cmd, "@Name", project.Name);
                    DbUtils.AddParameter(cmd, "@UserId", project.UserId);
                    project.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateProject(Project project)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Project
                            SET Name = @Name,
                                UserId = @UserId
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Name", project.Name);
                    DbUtils.AddParameter(cmd, "@UserId", project.UserId);
                    DbUtils.AddParameter(cmd, "@Id", project.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteProject(int projectId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Project WHERE Id = @projectId";
                    DbUtils.AddParameter(cmd, "@projectId", projectId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Project NewProjectFromDb(SqlDataReader reader)
        {
            return new Project()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                UserId = DbUtils.GetInt(reader, "UserId"),
            };
        }
    }
}
