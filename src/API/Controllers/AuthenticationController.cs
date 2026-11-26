using System.Security.Claims;
using eCommerce.Application.Identity;
using eCommerce.Application.Identity.DTOs;
using eCommerce.Application.Identity.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eCommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthenticationController(AuthenticationUseCases authenticationUseCases) : ControllerBase
{
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(LoginRequestDTO request)
    {
        AuthenticationResult result = await authenticationUseCases.SignInAsync(
            request.Email,
            request.Password);

        return result switch
        {
            AuthenticationResult.Succeeded => NoContent(),
            AuthenticationResult.InvalidCredentials => Unauthorized(new ProblemDetails
            {
                Title = "Authentication failed",
                Detail = "The email or password is incorrect.",
                Status = StatusCodes.Status401Unauthorized
            }),
            AuthenticationResult.LockedOut => StatusCode(StatusCodes.Status423Locked, new ProblemDetails
            {
                Title = "Account locked",
                Detail = "Your account is temporarily locked. Please try again later.",
                Status = StatusCodes.Status423Locked
            }),
            AuthenticationResult.NotAllowed => StatusCode(StatusCodes.Status403Forbidden, new ProblemDetails
            {
                Title = "Email confirmation required",
                Detail = "You must confirm your email address before signing in.",
                Status = StatusCodes.Status403Forbidden
            }),
            AuthenticationResult.RequiresTwoFactor => Conflict(new ProblemDetails
            {
                Title = "Two-factor authentication required",
                Detail = "Additional authentication is required.",
                Status = StatusCodes.Status409Conflict
            }),
            _ => StatusCode(StatusCodes.Status500InternalServerError),
        };
    }

    [HttpGet("current-user")]
    [Authorize]
    public IActionResult GetCurrentUser()
    {
        AuthenticatedUserDTO currentUser = new(
            Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!),
            User.FindFirstValue(ClaimTypes.Name)!,
            User.FindFirstValue(ClaimTypes.Email)!);

        return Ok(currentUser);
    }

    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout()
    {
        await authenticationUseCases.SignOutAsync();

        return NoContent();
    }
}