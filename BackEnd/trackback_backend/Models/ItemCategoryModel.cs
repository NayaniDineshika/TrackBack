using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace trackback_backend.Models
{
    [Table("ItemCategory")]
    public class ItemCategoryModel
    {
        [Key]
        public int CategoryId { get; set; }
        public required string CategoryName { get; set; }

        public ICollection<LostItemModel> LostItems { get; set; } = [];

        public ICollection<SubscriptionModel> Subscriptions { get; set; } = [];

        public ICollection<FoundItemsModel> FoundItems { get; set; } = [];
    }
}
