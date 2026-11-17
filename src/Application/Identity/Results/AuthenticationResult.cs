namespace eCommerce.Application.Identity.Results;
public enum AuthenticationResult
{
    Succeeded,
    InvalidCredentials,
    LockedOut,
    NotAllowed,
    RequiresTwoFactor
}