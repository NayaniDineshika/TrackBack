using System.ComponentModel.DataAnnotations;

namespace trackback_backend.Models
{
    public class ItemCategory
    {
        [Key]
        public int CategoryId { get; set; }
        public required string CategoryName { get; set; }
    }
}
