using Microsoft.AspNetCore.Identity;
using eCommerce.Application.Identity.Interfaces;
using eCommerce.Application.Identity.Results;

namespace eCommerce.Infrastructure.Identity;

public class AuthenticationService(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager) : IAuthenticationService
{
    public async Task<AuthenticationResult> SignInAsync(string email, string password)
    {
        ApplicationUser? user = await userManager.FindByEmailAsync(email);

        if (user == null) 
            return AuthenticationResult.InvalidCredentials;

        SignInResult result = await signInManager.PasswordSignInAsync(
                user,
                password,
                isPersistent: false,
                lockoutOnFailure: true // allows Identity to increment the failed-attempt counter
            );

        if (result.Succeeded)
            return AuthenticationResult.Succeeded;

        if (result.IsLockedOut)
            return AuthenticationResult.LockedOut;

        if (result.IsNotAllowed)
            return AuthenticationResult.NotAllowed;

        if (result.RequiresTwoFactor)
            return AuthenticationResult.RequiresTwoFactor;

        return AuthenticationResult.InvalidCredentials;
    }

    public Task SignOutAsync()
    {
        return signInManager.SignOutAsync();
    }

}
