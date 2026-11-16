using eCommerce.Application.Identity.Results;
using eCommerce.Application.Identity.Interfaces;


namespace eCommerce.Application.Identity;

public class AuthenticationUseCases(IAuthenticationService authenticationService)
{
    public Task<AuthenticationResult> SignInAsync(string email, string password) 
    {
        return authenticationService.SignInAsync(email, password);
    }

    public Task SignOutAsync()
    {
        return authenticationService.SignOutAsync();
    }
}
