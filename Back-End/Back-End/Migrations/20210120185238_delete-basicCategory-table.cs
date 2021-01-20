using Microsoft.EntityFrameworkCore.Migrations;

namespace Back_End.Migrations
{
    public partial class deletebasicCategorytable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_categories_BasicCategories_BasicCategoryId",
                table: "categories");

            migrationBuilder.DropTable(
                name: "BasicCategories");

            migrationBuilder.DropIndex(
                name: "IX_categories_BasicCategoryId",
                table: "categories");

            migrationBuilder.DropColumn(
                name: "BasicCategoryId",
                table: "categories");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BasicCategoryId",
                table: "categories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "BasicCategories",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BasicCategoryName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Propertyid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BasicCategories", x => x.id);
                    table.ForeignKey(
                        name: "FK_BasicCategories_properties_Propertyid",
                        column: x => x.Propertyid,
                        principalTable: "properties",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_categories_BasicCategoryId",
                table: "categories",
                column: "BasicCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_BasicCategories_Propertyid",
                table: "BasicCategories",
                column: "Propertyid");

            migrationBuilder.AddForeignKey(
                name: "FK_categories_BasicCategories_BasicCategoryId",
                table: "categories",
                column: "BasicCategoryId",
                principalTable: "BasicCategories",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
