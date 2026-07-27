using Microsoft.AspNetCore.Mvc;

namespace AdminDashboard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet]
    public IActionResult GetUsers()
    {
        var users = new[]
        {
            new
            {
                Id = 1,
                Name = "John Doe",
                Email = "john@example.com",
                Role = "admin"
            },
            new
            {
                Id = 2,
                Name = "Jane Smith",
                Email = "jane@example.com",
                Role = "manager"
            }
        };

        return Ok(users);
    }
}