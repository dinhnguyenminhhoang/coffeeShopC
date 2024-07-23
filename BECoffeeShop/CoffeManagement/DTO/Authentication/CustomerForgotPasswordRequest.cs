using System.ComponentModel.DataAnnotations;

namespace CoffeManagement.DTO.Authentication
{
    public class CustomerForgotPasswordRequest
    {
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

    }
}
