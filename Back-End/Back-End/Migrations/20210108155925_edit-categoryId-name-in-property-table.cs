using Microsoft.EntityFrameworkCore.Migrations;

namespace Back_End.Migrations
{
    public partial class editcategoryIdnameinpropertytable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_properties_categories_CategoryId",
                table: "properties");

            migrationBuilder.DropIndex(
                name: "IX_properties_CategoryId",
                table: "properties");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "properties",
                newName: "categoryId");

            migrationBuilder.CreateIndex(
                name: "IX_properties_categoryId",
                table: "properties",
                column: "categoryId",
                unique: true,
                filter: "[categoryId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_properties_categories_categoryId",
                table: "properties",
                column: "categoryId",
                principalTable: "categories",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_properties_categories_categoryId",
                table: "properties");

            migrationBuilder.DropIndex(
                name: "IX_properties_categoryId",
                table: "properties");

            migrationBuilder.RenameColumn(
                name: "categoryId",
                table: "properties",
                newName: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_properties_CategoryId",
                table: "properties",
                column: "CategoryId",
                unique: true,
                filter: "[CategoryId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_properties_categories_CategoryId",
                table: "properties",
                column: "CategoryId",
                principalTable: "categories",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
