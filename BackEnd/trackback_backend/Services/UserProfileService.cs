namespace trackback_backend.Services
{
    public class UserProfileService
    {
        readonly public TrackBackDbContext _context;

        public UserProfileService(TrackBackDbContext context)
        {
            _context = context;
        }

        
    }
}
