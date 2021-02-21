using Microsoft.EntityFrameworkCore.Migrations;

namespace Back_End.Migrations
{
    public partial class addphonefieldtoproperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "phoneNumber",
                table: "properties",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "phoneNumber",
                table: "properties");
        }
    }
}
