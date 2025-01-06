using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PartInspectorDb.Entities
{
    public class Users
    {
        [Key, Column(Order = 0)]
        public required string BadgeId { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}
