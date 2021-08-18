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
    public class TaskRepository : BaseRepository
    {
        public TaskRepository(IConfiguration configuration) : base(configuration) { }

        public List<TaskObject> GetAllUserTasks(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT t.Id, t.ProjectId, t.Name, t.Deadline, t.PriorityId,
                               p.Id, p.UserId
                        FROM TaskObject t
                        JOIN [User] u ON u.Id = p.UserId
                        JOIN Project p ON p.Id = t.ProjectId
                        WHERE u.FirebaseUserId = @FirebaseUserId
                    ";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);
                    var reader = cmd.ExecuteReader();
                    List<TaskObject> tasks = new List<TaskObject>();
                    while (reader.Read())
                    {
                        tasks.Add(NewTaskFromDb(reader));
                    };

                    conn.Close();

                    return tasks;
                }
            }
        }

        public TaskObject GetTaskById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, ProjectId, [Name], Deadline, PriorityId
                        FROM TaskObject
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    TaskObject task = null;
                    while (reader.Read())
                    {
                        if (task == null)
                        {
                            task = NewTaskFromDb(reader);
                        }
                    }

                    reader.Close();

                    return task;
                }
            }
        }

        public void AddTask(TaskObject task)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO TaskObject (ProjectId, Name, Deadline, PriorityId)
                        OUTPUT INSERTED.ID
                        VALUES (@ProjectId, @Name, @Deadline, @PriorityId)
                    ";

                    DbUtils.AddParameter(cmd, "@ProjectId", task.ProjectId);
                    DbUtils.AddParameter(cmd, "@Name", task.Name);
                    DbUtils.AddParameter(cmd, "@Deadline", task.Deadline);
                    DbUtils.AddParameter(cmd, "@PriorityId", task.PriorityId);
                    task.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateTask(TaskObject task)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UDPATE TaskObject
                            SET ProjectId = @ProjectId,
                                Name = @Name,
                                Deadline = @Deadline,
                                PriorityId = @PriorityId
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@ProjectId", task.ProjectId);
                    DbUtils.AddParameter(cmd, "@Name", task.Name);
                    DbUtils.AddParameter(cmd, "@Deadline", task.Deadline);
                    DbUtils.AddParameter(cmd, "@PriorityId", task.PriorityId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteTask(int taskId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM TaskObject WHERE Id = @taskId";
                    DbUtils.AddParameter(cmd, "@taskId", taskId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        private TaskObject NewTaskFromDb(SqlDataReader reader)
        {
            return new TaskObject()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                ProjectId = DbUtils.GetInt(reader, "ProjectId"),
                Name = DbUtils.GetString(reader, "Name"),
                Deadline = DbUtils.GetDateTime(reader, "Deadline"),
                PriorityId = DbUtils.GetInt(reader, "PriorityId"),
            };
        }
    }
}
