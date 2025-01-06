using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using PartInspectorApi.Models;
using PartInspectorDb;
using PartInspectorDb.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PartInspectorApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        public readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("GetAllUsers")]
        public IActionResult GetUsers()
        {
            using (var inspectorContext = new PartInspectorDbContext())
            {
                // Fetch all users and map them directly to UserInfoModel using LINQ
                var model = inspectorContext.Users
                    .Select(user => new UserInfoModel
                    {
                        BadgeId = user.BadgeId,
                        Username = user.Username,
                        Password = user.Password
                    })
                    .ToList();

                if (model == null)
                    return NotFound("No users found in the database");

                // Return the result as JSON
                return new JsonResult(model);
            }
        }

        [HttpGet]
        [Route("GetUserBadge")]
        public IActionResult GetUserBadge(String badgeId)
        {
            using (var inspectorContext = new PartInspectorDbContext())
            {
                var user = inspectorContext.Users.FirstOrDefault(u => u.BadgeId == badgeId);

                if (user == null)
                    return NotFound("User not found with the given BadgeId.");

                var userInfo = new UserInfoModel
                {
                    BadgeId = user.BadgeId,
                    Username = user.Username,
                    Password = user.Password
                };

                return new JsonResult(userInfo);
            }
        }

        [HttpGet]
        [Route("GetUserName")]
        public IActionResult GetUserName(String username)
        {
            using (var inspectorContext = new PartInspectorDbContext())
            {
                var user = inspectorContext.Users.FirstOrDefault(u => u.Username == username);

                if (user == null)
                    return NotFound("User not found with the given Username.");

                var userInfo = new UserInfoModel
                {
                    BadgeId = user.BadgeId,
                    Username = user.Username,
                    Password = user.Password
                };

                return new JsonResult(userInfo);
            }
        }

        /*
         * If querying from AWS need to specify content-type: application/json in the header
         * For inserting a new user
         * UserInfoModel includes
         *  - badgeId: "id" The badge num of the new acc
         *  - username: "name" The username of the new acc
         *  - password: "pass" The password of the new acc
         */
        [HttpPost]
        [Route("InsertUser")]
        public IActionResult InsertUser([FromBody] UserInfoModel newUser)
        {
            // Ensure new user is not null
            if (newUser == null || string.IsNullOrEmpty(newUser.Username) || string.IsNullOrEmpty(newUser.Password) || string.IsNullOrEmpty(newUser.BadgeId))
                return BadRequest("Invalid user data.");

            // Ensure BadgeId is exactly 8 digits
            if (newUser.BadgeId.ToString().Length != 8 || newUser.BadgeId.Length < 0)
                return BadRequest("BadgeId must be exactly 8 digits or non-negative.");

            using (var inspectorContext = new PartInspectorDbContext())
            {
                var user = new Users
                {
                    BadgeId = newUser.BadgeId,
                    Username = newUser.Username,
                    Password = newUser.Password
                };

                inspectorContext.Users.Add(user);
                inspectorContext.SaveChanges();

                return Ok("User added successfully.");
            }
        }

        /*
         * Remove a user from the database
         * Username - The user to remove
         */
        [HttpDelete]
        [Route("RemoveUser")]
        public IActionResult RemoveUser(string username)
        {
            if (string.IsNullOrEmpty(username))
                return BadRequest("Username cannot be empty.");

            using (var inspectorContext = new PartInspectorDbContext())
            {
                var user = inspectorContext.Users.FirstOrDefault(u => u.Username == username);

                if (user == null)
                    return NotFound($"User with username '{username}' not found.");

                inspectorContext.Users.Remove(user);
                inspectorContext.SaveChanges();

                return Ok($"User with username '{username}' has been removed.");
            }
        }
    }
}
