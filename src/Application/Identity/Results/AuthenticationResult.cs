using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Identity.Results;
public enum AuthenticationResult
{
    Succeeded,
    InvalidCredentials,
    LockedOut,
    NotAllowed,
    RequiresTwoFactor
}