using Microsoft.EntityFrameworkCore;
using trackback_backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace trackback_backend.Services
{
    public class SubscriptionsService
    {
        private readonly TrackBackDbContext _context;

        public SubscriptionsService(TrackBackDbContext context)
        {
            _context = context;
        }

        public async Task AddSubscriptionAsync(int userId, int categoryId)
        {
            if(await IsUserSubscribed(userId, categoryId)) 
                return;

            var subscriptions = new SubscriptionModel
            {
                UserId = userId,
                CategoryId = categoryId,
                CreatedAt = DateTime.UtcNow,
            };

            await _context.Subscription.AddAsync(subscriptions);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> IsUserSubscribed(int userId, int categoryId)
        {
            return await _context.Subscription.AnyAsync(s => s.UserId == userId && s.CategoryId == categoryId);
        }

    }
}
