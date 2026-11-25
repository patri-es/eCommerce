using System.ComponentModel.DataAnnotations;

namespace eCommerce.Application.Identity.DTOs;

public record LoginRequestDTO(
    [Required]
    [EmailAddress]
    string Email,

    [Required]
    string Password
);