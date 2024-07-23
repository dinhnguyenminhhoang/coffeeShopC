using CoffeManagement.Infrastructure.Email.Models;
using System.Net.Mail;

namespace CoffeManagement.Infrastructure.Email
{
    public interface IEmailService
    {
        Task SendEmailAsync(EmailMessage emailMessage);
    }
}
