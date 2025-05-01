using System.ComponentModel.DataAnnotations;

namespace trackback_backend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string PasswordHash { get; set; }  // Store the hashed password
        public ICollection<SubscriptionModel> Subscriptions { get; set; } = [];
    }
}
