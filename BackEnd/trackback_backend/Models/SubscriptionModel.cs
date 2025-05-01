using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace trackback_backend.Models
{
    [Table("Subscription")]
    public class SubscriptionModel
    {
        [Key]
        public int SubId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        public DateTime CreatedAt { get; set; }

        public virtual User User { get; set; }
        public virtual ItemCategoryModel Category { get; set; }

    }
}
