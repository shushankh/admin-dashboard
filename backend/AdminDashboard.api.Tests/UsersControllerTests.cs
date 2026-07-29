using AdminDashboard.api.Controllers;
using AdminDashboard.api.Data;
using AdminDashboard.api.DTOs.Users;
using AdminDashboard.api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AdminDashboard.api.Tests;

public class UsersControllerTests
{
    private ApplicationDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new ApplicationDbContext(options);
    }

    [Fact]
    public async Task GetUsers_ReturnsOkWithUsers()
    {
        // Arrange
        await using var context = CreateDbContext();

        context.Users.Add(new User
        {
            Name = "John Doe",
            Email = "john@example.com"
        });

        await context.SaveChangesAsync();

        var controller = new UsersController(context);

        // Act
        var result = await controller.GetUsers();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var users = Assert.IsAssignableFrom<IEnumerable<UserResponseDto>>(
            okResult.Value
        );

        Assert.Single(users);
    }

    [Fact]
    public async Task GetUser_ReturnsNotFound_WhenUserDoesNotExist()
    {
        // Arrange
        await using var context = CreateDbContext();
        var controller = new UsersController(context);

        // Act
        var result = await controller.GetUser(999);

        // Assert
        Assert.IsType<NotFoundResult>(result.Result);
    }

    [Fact]
    public async Task CreateUser_CreatesUserSuccessfully()
    {
        // Arrange
        await using var context = CreateDbContext();
        var controller = new UsersController(context);

        var dto = new CreateUserDto
        {
            Name = "Jane Doe",
            Email = "jane@example.com"
        };

        // Act
        var result = await controller.CreateUser(dto);

        // Assert
        var createdResult = Assert.IsType<CreatedAtActionResult>(
            result.Result
        );

        var createdUser = Assert.IsType<UserResponseDto>(
            createdResult.Value
        );

        Assert.Equal("Jane Doe", createdUser.Name);
        Assert.Equal("jane@example.com", createdUser.Email);

        Assert.Single(context.Users);
    }

    [Fact]
    public async Task UpdateUser_ReturnsNotFound_WhenUserDoesNotExist()
    {
        // Arrange
        await using var context = CreateDbContext();
        var controller = new UsersController(context);

        var dto = new UpdateUserDto
        {
            Name = "Updated User",
            Email = "updated@example.com"
        };

        // Act
        var result = await controller.UpdateUser(999, dto);

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task DeleteUser_ReturnsNotFound_WhenUserDoesNotExist()
    {
        // Arrange
        await using var context = CreateDbContext();
        var controller = new UsersController(context);

        // Act
        var result = await controller.DeleteUser(999);

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }
}