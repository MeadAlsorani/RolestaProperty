using Microsoft.EntityFrameworkCore.Migrations;

namespace Back_End.Migrations
{
    public partial class addtranslatefieldstocarsandproperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DescriptionEn",
                table: "properties",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DescriptionTr",
                table: "properties",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "descriptionEn",
                table: "cars",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "descriptionTr",
                table: "cars",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DescriptionEn",
                table: "properties");

            migrationBuilder.DropColumn(
                name: "DescriptionTr",
                table: "properties");

            migrationBuilder.DropColumn(
                name: "descriptionEn",
                table: "cars");

            migrationBuilder.DropColumn(
                name: "descriptionTr",
                table: "cars");
        }
    }
}
