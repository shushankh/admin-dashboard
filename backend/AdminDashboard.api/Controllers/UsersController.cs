using Microsoft.AspNetCore.Mvc;
using AdminDashboard.api.DTOs.Users;
using AdminDashboard.api.Models;

namespace AdminDashboard.api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private static readonly List<User> Users = new()
    {
        new User
        {
            Id = 1,
            Name = "John Doe",
            Email = "john@example.com",
            Role = "admin",
            Status = "active",
            CreatedAt = DateTime.UtcNow
        },
        new User
        {
            Id = 2,
            Name = "Jane Smith",
            Email = "jane@example.com",
            Role = "manager",
            Status = "active",
            CreatedAt = DateTime.UtcNow
        }
    };

    [HttpGet]
    public ActionResult<IEnumerable<UserResponseDto>> GetUsers()
    {
        var users = Users.Select(user => new UserResponseDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role,
            Status = user.Status,
            CreatedAt = user.CreatedAt
        });

        return Ok(users);
    }

    [HttpGet("{id}")]
    public ActionResult<UserResponseDto> GetUser(int id)
    {
        var user = Users.FirstOrDefault(user => user.Id == id);

        if (user is null)
        {
            return NotFound();
        }

        var response = new UserResponseDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role,
            Status = user.Status,
            CreatedAt = user.CreatedAt
        };

        return Ok(response);
    }

    [HttpPost]
    public ActionResult<UserResponseDto> CreateUser(CreateUserDto dto)
    {
        var user = new User
        {
            Id = Users.Count + 1,
            Name = dto.Name,
            Email = dto.Email,
            Role = dto.Role,
            Status = dto.Status,
            CreatedAt = DateTime.UtcNow
        };

        Users.Add(user);

        var response = new UserResponseDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role,
            Status = user.Status,
            CreatedAt = user.CreatedAt
        };

        return CreatedAtAction(
            nameof(GetUser),
            new { id = user.Id },
            response
        );
    }

    [HttpPut("{id}")]
    public IActionResult UpdateUser(int id, UpdateUserDto dto)
    {
        var user = Users.FirstOrDefault(user => user.Id == id);

        if (user is null)
        {
            return NotFound();
        }

        user.Name = dto.Name;
        user.Email = dto.Email;
        user.Role = dto.Role;
        user.Status = dto.Status;

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteUser(int id)
    {
        var user = Users.FirstOrDefault(user => user.Id == id);

        if (user is null)
        {
            return NotFound();
        }

        Users.Remove(user);

        return NoContent();
    }
}