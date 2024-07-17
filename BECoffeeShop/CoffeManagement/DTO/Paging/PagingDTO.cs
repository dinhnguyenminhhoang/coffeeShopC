using System.ComponentModel.DataAnnotations;

namespace CoffeManagement.DTO.Paging
{
    public class PagingDTO
    {
        [Required]
        [Range(minimum: 1, maximum: int.MaxValue)]
        public int PageIndex { get; set; }

        [Required]
        [Range(minimum: 1, maximum: int.MaxValue)]
        public int PageSize { get; set; }
    }
}
