namespace trackback_backend.DTOs
{
    public class FoundItemsDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public DateTime DateFound { get; set; }
        public string Location { get; set; }
        public IFormFile? Image { get; set; } // <-- uploaded file
        public string? ImageUrl { get; set; }
        public int UserId { get; set; }
    }
}
