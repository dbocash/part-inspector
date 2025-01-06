using Microsoft.AspNetCore.Mvc;
using PartInspectorApi.Models;
using PartInspectorDb;
using PartInspectorDb.Entities;

namespace PartInspectorApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PartInspectionController : ControllerBase
    {
        public readonly IConfiguration _configuration;
        public PartInspectionController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /*
         * Get all the parts from the database
         * For getting all part entries
         */
        [HttpGet]
        [Route("GetAllParts")]
        public IActionResult GetParts()
        {
            using (var inspectorContext = new PartInspectorDbContext())
            {
                var model = inspectorContext.Parts
                    .Join(inspectorContext.Users,
                        part => part.BadgeId,
                        user => user.BadgeId,
                        (part, user) => new PartInspectionModel
                        {
                            Id = part.PartId,
                            BadgeId = part.BadgeId,
                            PartNumber = part.PartNumber,
                            AcceptOrReject = part.AcceptOrReject,
                            Username = user.Username
                        })
                    .ToList();

                if (model == null)
                    return NotFound("No parts found in the database.");

                return new JsonResult(model);
            }
        }

        /*
         * For getting parts based on badgeId
         * BadgeId - The badgeId to get from the database
         */
        [HttpGet]
        [Route("GetPartsByBadgeId")]
        public IActionResult GetPartsByBadgeId(string badgeId)
        {
            using (var inspectorContext = new PartInspectorDbContext())
            {
                var model = inspectorContext.Parts
                    .Where(part => part.BadgeId == badgeId)
                    .Join(inspectorContext.Users,
                        part => part.BadgeId,
                        user => user.BadgeId,
                        (part, user) => new PartInspectionModel
                        {
                            Id = part.PartId,
                            BadgeId = part.BadgeId,
                            PartNumber = part.PartNumber,
                            AcceptOrReject = part.AcceptOrReject,
                            Username = user.Username  // Join to get Username
                        })
                    .ToList();

                if (model == null)
                    return NotFound($"No parts found for BadgeId {badgeId}.");

                return new JsonResult(model);
            }
        }

        /*
         * For getting parts based on part number
         * partNumber - The part number to filter by
         */
        [HttpGet]
        [Route("GetPartsByPartNumber")]
        public IActionResult GetPartsByPartNumber(string partNumber)
        {
            using (var inspectorContext = new PartInspectorDbContext())
            {
                var model = inspectorContext.Parts
                    .Where(part => part.PartNumber == partNumber)
                    .Join(inspectorContext.Users,
                        part => part.BadgeId,
                        user => user.BadgeId,
                        (part, user) => new PartInspectionModel
                        {
                            Id = part.PartId,
                            BadgeId = part.BadgeId,
                            PartNumber = part.PartNumber,
                            AcceptOrReject = part.AcceptOrReject,
                            Username = user.Username  // Join to get Username
                        })
                    .ToList();

                if (model == null)
                    return NotFound($"No parts found with PartNumber {partNumber}.");

                return new JsonResult(model);
            }
        }

        /*
         * For getting the parts based on being accepted or rejected
         * acceptOrReject - The type to filter by
         */
        [HttpGet]
        [Route("GetPartsByAcceptOrReject")]
        public IActionResult GetPartsByAcceptOrReject(string acceptOrReject)
        {
            using (var inspectorContext = new PartInspectorDbContext())
            {
                var model = inspectorContext.Parts
                    .Where(part => part.AcceptOrReject == acceptOrReject)
                    .Join(inspectorContext.Users,
                        part => part.BadgeId,
                        user => user.BadgeId,
                        (part, user) => new PartInspectionModel
                        {
                            Id = part.PartId,
                            BadgeId = part.BadgeId,
                            PartNumber = part.PartNumber,
                            AcceptOrReject = part.AcceptOrReject,
                            Username = user.Username  // Join to get Username
                        })
                    .ToList();

                if (model == null)
                    return NotFound($"No parts found with AcceptOrReject status '{acceptOrReject}'.");

                return new JsonResult(model);
            }
        }


        /**
         *  For Inserting a new part into the Inspector Database
         *  The newpart must inclue a BadgeId, PartNumber, and AcceptOrReject
         *  If in AWS ~ content-type: application/json in the header
         *  Don't need to specify Id as it will auto gen
         */
        [HttpPost]
        [Route("InsertPart")]
        public IActionResult InsertPart([FromBody] PartInspectionModel newPart)
        {
            if (newPart == null)
                return BadRequest("Invalid part data.");

            // Validate BadgeId is exactly 8 digits
            if (newPart.BadgeId.ToString().Length != 8)
                return BadRequest("BadgeId must be exactly 8 digits.");

            // Validate PartNumber is exactly 8 digits
            if (newPart.PartNumber.Length != 8)
                return BadRequest("PartNumber must be exactly 8 digits.");

            // Validate AcceptOrReject is either "Accept" or "Reject"
            if (newPart.AcceptOrReject != "accept" && newPart.AcceptOrReject != "reject")
                return BadRequest("AcceptOrReject must be either 'accept' or 'reject'.");

            using (var inspectorContext = new PartInspectorDbContext())
            {
                // Check if the BadgeId exists in the User table
                var user = inspectorContext.Users.FirstOrDefault(user => user.BadgeId == newPart.BadgeId);

                // Check if the user exists
                if (user == null)
                    return BadRequest("The BadgeId does not exist in the system.");

                // Check if the input username matches
                if (user.Username != newPart.Username)
                    return BadRequest("The username does not match the provided BadgeId");

                // Create the new part and save it to the database
                var part = new Parts
                {
                    BadgeId = newPart.BadgeId,
                    PartNumber = newPart.PartNumber,
                    AcceptOrReject = newPart.AcceptOrReject
                };

                // Add and save the changes
                inspectorContext.Parts.Add(part);
                inspectorContext.SaveChanges();

                return Ok("Part added successfully.");
            }
        }
    }
}
