using System.ComponentModel.DataAnnotations;

namespace CoffeManagement.DTO.Authentication
{
    public class CustomerResetPasswordRequest
    {
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

    }
}
