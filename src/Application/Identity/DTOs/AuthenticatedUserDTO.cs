using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Identity.DTOs;

public record AuthenticatedUserDTO(
    Guid Id,
    string UserName,
    string Email
);
