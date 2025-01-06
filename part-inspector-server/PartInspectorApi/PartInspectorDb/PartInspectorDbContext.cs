using PartInspectorDb.Entities;
using System.Data.Entity;

namespace PartInspectorDb
{
    /*
     * Creates a database context to connect to the database
     * Here to create a seperate project for handling the database
     * Can also create migrations if we want to add db's without accessing via Management Studio
     */
    public class PartInspectorDbContext : DbContext
    {
       static PartInspectorDbContext()
        {
            Database.SetInitializer(new NullDatabaseInitializer<PartInspectorDbContext>());
        }

        public PartInspectorDbContext()
            : base("name=PartInspector")
        {
        }

        // Grabs the Users Table from the database
        public virtual DbSet<Users> Users { get; set; }

        // Grabs the Parts Table from the db
        public virtual DbSet<Parts> Parts { get; set; }
    }
}
