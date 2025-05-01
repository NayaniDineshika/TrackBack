using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using trackback_backend.DTOs;
using trackback_backend.Models;
using trackback_backend.Services;


namespace trackback_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ItemsController : ControllerBase
    {
        private readonly TrackBackDbContext _context;
        private readonly SubscriptionsService _subscriptions;

        public ItemsController(TrackBackDbContext context, SubscriptionsService subscriptions)
        {
            _context = context;
            _subscriptions = subscriptions;
        }

        [HttpGet("categories")]
        public async Task<ActionResult> GetCategories()
        {
            try
            {
                var categories = await _context.ItemCategory.ToListAsync();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        //[Authorize]
        //[HttpPost("lost")]
        //public async Task<ActionResult> SubmitLostItem([FromForm] LostItemDto model)
        //{
        //    var user = HttpContext.User.Identity;
        //    Console.WriteLine($"IsAuthenticated: {user?.IsAuthenticated}, Name: {user?.Name}");

        //    var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        //    if (userIdClaim == null)
        //    {
        //        return Unauthorized("User Id not found In token");
        //    }

        //    if (!ModelState.IsValid)
        //        return BadRequest(ModelState);

        //    if(model.Image != null)
        //    {
        //        var filePath = Path.Combine("wwwroot/images", model.Image.FileName);
        //        using (var stream = new FileStream(filePath, FileMode.Create))
        //        {
        //            await model.Image.CopyToAsync(stream);
        //        }

        //        // Optional: Save path to DB
        //        model.ImageUrl = "/images/" + model.Image.FileName;
        //    }

        //    //int userId = int.Parse(userIdClaim.Value);
        //    int userId = 1;
        //    var lostItem = new LostItemModel
        //    {
        //        UserId = userId, // use extracted ID
        //        Title = model.Title,
        //        Description = model.Description,
        //        CategoryId = model.CategoryId,
        //        DateLost = model.DateLost,
        //        Location = model.Location,
        //        ImageUrl = model.ImageUrl,
        //        CreatedAt = DateTime.Now,
        //    };

        //    _context.LostItems.Add(lostItem);
        //    await _context.SaveChangesAsync();

        //    return Ok(new { message = "Lost item submited successfully" });
        //}




        [HttpPost("lost")]
        public async Task<ActionResult> SubmitLostItem([FromForm] LostItemDto lostItemDto)
        {
            if (lostItemDto == null)
            {
                return BadRequest("Invalid data.");
            }

            if (lostItemDto.IsNotify == true)
            {
                await _subscriptions.AddSubscriptionAsync(lostItemDto.UserId, lostItemDto.CategoryId);
            }
            // Save Image if Exists
            string imageUrl = null;
            if (lostItemDto.Image != null)
            {
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(lostItemDto.Image.FileName);
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await lostItemDto.Image.CopyToAsync(stream);
                }
                imageUrl = $"/images/{fileName}"; // Store the image URL
            }

            var lostItem = new LostItemModel
            {
                Title = lostItemDto.Title,
                Description = lostItemDto.Description,
                CategoryId = lostItemDto.CategoryId,
                DateLost = lostItemDto.DateLost,
                Location = lostItemDto.Location,
                ImageUrl = imageUrl,
                UserId = lostItemDto.UserId,
                CreatedAt = DateTime.Now
            };

            // Save to database
            _context.LostItems.Add(lostItem);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Lost item submitted successfully." });
        }


        [HttpPost("found")]
        public async Task<ActionResult> SubmitFoundItem([FromForm] FoundItemsDto foundItemsDto)
        {
            if (foundItemsDto == null)
            {
                return BadRequest("Invalid data.");
            }


            // Save Image if Exists
            string imageUrl = null;
            if (foundItemsDto.Image != null)
            {
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(foundItemsDto.Image.FileName);
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await foundItemsDto.Image.CopyToAsync(stream);
                }
                imageUrl = $"/images/{fileName}"; // Store the image URL
            }

            var foundItem = new FoundItemsModel
            {
                Title = foundItemsDto.Title,
                Description = foundItemsDto.Description,
                CategoryId = foundItemsDto.CategoryId,
                DateFound = foundItemsDto.DateFound,
                Location = foundItemsDto.Location,
                ImageUrl = imageUrl,
                UserId = foundItemsDto.UserId,
                CreatedAt = DateTime.Now
            };

            // Save to database
            _context.FoundItems.Add(foundItem);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Found item submitted successfully." });
        }

        [HttpGet("getLostItem")]
        public async Task<IActionResult> GetLostItemDeatails()
        {
            try
            {
                var itemsDeatils = await _context.LostItems.ToListAsync();
                return Ok(itemsDeatils);
            }
            catch(Exception ex)
            {
                 return BadRequest(ex.Message);
            }
        }

        [HttpGet("getLostItem/{userId}")]
        public async Task<IActionResult> GetLostItemDeatails(int userId)
        {
            try
            {
                var itemsDeatils = await _context.LostItems
                    .Where(item => item.UserId == userId)
                    .ToListAsync();

                return Ok(itemsDeatils);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getUserDeatils/{userId}")]
        public async Task<IActionResult> GetUserDeatails(int userId)
        {
            try
            {
                var itemsDeatils = await _context.Users
                    .Where(item => item.Id == userId)
                    .ToListAsync();

                return Ok(itemsDeatils);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }

}
