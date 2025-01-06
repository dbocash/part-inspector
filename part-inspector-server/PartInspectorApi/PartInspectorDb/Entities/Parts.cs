using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PartInspectorDb.Entities
{
    public class Parts
    {
        [Key, Column(Order = 0)]
        public int PartId { get; set; } // This is auto incremented in the database
        public required string BadgeId { get; set; }
        public required string PartNumber { get; set; }
        public required string AcceptOrReject { get; set; }
    }
}
