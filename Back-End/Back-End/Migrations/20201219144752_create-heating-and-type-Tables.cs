using Microsoft.EntityFrameworkCore.Migrations;

namespace Back_End.Migrations
{
    public partial class createheatingandtypeTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "properties");

            migrationBuilder.AddColumn<string>(
                name: "adOwner",
                table: "properties",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "area",
                table: "properties",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "buildingAge",
                table: "properties",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "buildingFloors",
                table: "properties",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "date",
                table: "properties",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "floor",
                table: "properties",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "heatingId",
                table: "properties",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "inSite",
                table: "properties",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isFurnished",
                table: "properties",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "proceeds",
                table: "properties",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "typeId",
                table: "properties",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "heatings",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    heatingName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_heatings", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "types",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    typeName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_types", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_properties_heatingId",
                table: "properties",
                column: "heatingId");

            migrationBuilder.CreateIndex(
                name: "IX_properties_typeId",
                table: "properties",
                column: "typeId");

            migrationBuilder.AddForeignKey(
                name: "FK_properties_heatings_heatingId",
                table: "properties",
                column: "heatingId",
                principalTable: "heatings",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_properties_types_typeId",
                table: "properties",
                column: "typeId",
                principalTable: "types",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_properties_heatings_heatingId",
                table: "properties");

            migrationBuilder.DropForeignKey(
                name: "FK_properties_types_typeId",
                table: "properties");

            migrationBuilder.DropTable(
                name: "heatings");

            migrationBuilder.DropTable(
                name: "types");

            migrationBuilder.DropIndex(
                name: "IX_properties_heatingId",
                table: "properties");

            migrationBuilder.DropIndex(
                name: "IX_properties_typeId",
                table: "properties");

            migrationBuilder.DropColumn(
                name: "adOwner",
                table: "properties");

            migrationBuilder.DropColumn(
                name: "area",
                table: "properties");

            migrationBuilder.DropColumn(
                name: "buildingAge",
                table: "properties");

            migrationBuilder.DropColumn(
                name: "buildingFloors",
                table: "properties");

            migrationBuilder.DropColumn(
                name: "date",
                table: "properties");

            migrationBuilder.DropColumn(
                name: "floor",
                table: "properties");

            migrationBuilder.DropColumn(
                name: "heatingId",
                table: "properties");

            migrationBuilder.DropColumn(
                name: "inSite",
                table: "properties");

            migrationBuilder.DropColumn(
                name: "isFurnished",
                table: "properties");

            migrationBuilder.DropColumn(
                name: "proceeds",
                table: "properties");

            migrationBuilder.DropColumn(
                name: "typeId",
                table: "properties");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "properties",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
