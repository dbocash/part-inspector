namespace PartInspectorApi.Models
{
    public class PartInspectionModel
    {
        public int Id { get; set; }
        public String BadgeId { get; set; }
        public String PartNumber {get; set; }
        public String AcceptOrReject { get; set; }
        public String Username { get; set; }
    }
}
