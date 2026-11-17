using System;
using System.Collections.Generic;
using System.Text;
using eCommerce.Application.Identity.Results;

namespace eCommerce.Application.Identity.Interfaces;

public interface IAuthenticationService
{
    Task<AuthenticationResult> SignInAsync(
        string email,
        string password);

    Task SignOutAsync();
}