using Microsoft.EntityFrameworkCore.Migrations;

namespace Back_End.Migrations
{
    public partial class changecategoryAndSubunique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_properties_secondSubCategoryId",
                table: "properties");

            migrationBuilder.DropIndex(
                name: "IX_properties_subCategoryId",
                table: "properties");

            migrationBuilder.CreateIndex(
                name: "IX_properties_secondSubCategoryId",
                table: "properties",
                column: "secondSubCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_properties_subCategoryId",
                table: "properties",
                column: "subCategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_properties_secondSubCategoryId",
                table: "properties");

            migrationBuilder.DropIndex(
                name: "IX_properties_subCategoryId",
                table: "properties");

            migrationBuilder.CreateIndex(
                name: "IX_properties_secondSubCategoryId",
                table: "properties",
                column: "secondSubCategoryId",
                unique: true,
                filter: "[secondSubCategoryId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_properties_subCategoryId",
                table: "properties",
                column: "subCategoryId",
                unique: true,
                filter: "[subCategoryId] IS NOT NULL");
        }
    }
}
