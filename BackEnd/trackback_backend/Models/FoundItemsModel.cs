using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace trackback_backend.Models
{
    [Table("Found_Items")]
    public class FoundItemsModel
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }

        public int CategoryId { get; set; }

        // Explicit FK relationship
        [ForeignKey("CategoryId")]
        public ItemCategoryModel Category { get; set; }
        public DateTime DateFound { get; set; }
        public string Location { get; set; }
        public string ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
