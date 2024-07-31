using CoffeManagement.DTO.Account;
using Google.Apis.Gmail.v1.Data;
using System.ComponentModel.DataAnnotations;

namespace CoffeManagement.DTO.Customer
{
    public class CustomerChangePasswordRequest
    {
        [Required(ErrorMessage = "Old Password is required")]
        public  string OldPassword { get; set; }

        [Required(ErrorMessage = "New Password is required")]
        public  string NewPassword { get; set; }
    }
}
