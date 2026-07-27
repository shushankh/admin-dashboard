using AdminDashboard.api.Data;
using AdminDashboard.api.DTOs.Users;
using AdminDashboard.api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AdminDashboard.api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UsersController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/users
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserResponseDto>>> GetUsers()
    {
        var users = await _context.Users
            .Select(user => new UserResponseDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role,
                Status = user.Status,
                CreatedAt = user.CreatedAt
            })
            .ToListAsync();

        return Ok(users);
    }

    // GET: api/users/1
    [HttpGet("{id}")]
    public async Task<ActionResult<UserResponseDto>> GetUser(int id)
    {
        var user = await _context.Users
            .Where(user => user.Id == id)
            .Select(user => new UserResponseDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role,
                Status = user.Status,
                CreatedAt = user.CreatedAt
            })
            .FirstOrDefaultAsync();

        if (user is null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    // POST: api/users
    [HttpPost]
    public async Task<ActionResult<UserResponseDto>> CreateUser(
        CreateUserDto dto)
    {
        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            Role = dto.Role,
            Status = dto.Status,
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);

        await _context.SaveChangesAsync();

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

    // PUT: api/users/1
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(
        int id,
        UpdateUserDto dto)
    {
        var user = await _context.Users
            .FindAsync(id);

        if (user is null)
        {
            return NotFound();
        }

        user.Name = dto.Name;
        user.Email = dto.Email;
        user.Role = dto.Role;
        user.Status = dto.Status;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/users/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Users
            .FindAsync(id);

        if (user is null)
        {
            return NotFound();
        }

        _context.Users.Remove(user);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}