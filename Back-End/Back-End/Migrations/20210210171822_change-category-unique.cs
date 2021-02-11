using Microsoft.EntityFrameworkCore.Migrations;

namespace Back_End.Migrations
{
    public partial class changecategoryunique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_properties_categories_categoryId",
                table: "properties");

            migrationBuilder.DropForeignKey(
                name: "FK_properties_SubCategories_subCategoryId",
                table: "properties");

            migrationBuilder.DropIndex(
                name: "IX_properties_categoryId",
                table: "properties");

            migrationBuilder.DropIndex(
                name: "IX_properties_subCategoryId",
                table: "properties");

            migrationBuilder.AlterColumn<int>(
                name: "subCategoryId",
                table: "properties",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "categoryId",
                table: "properties",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_properties_categoryId",
                table: "properties",
                column: "categoryId");

            migrationBuilder.CreateIndex(
                name: "IX_properties_subCategoryId",
                table: "properties",
                column: "subCategoryId",
                unique: true,
                filter: "[subCategoryId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_properties_categories_categoryId",
                table: "properties",
                column: "categoryId",
                principalTable: "categories",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_properties_SubCategories_subCategoryId",
                table: "properties",
                column: "subCategoryId",
                principalTable: "SubCategories",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_properties_categories_categoryId",
                table: "properties");

            migrationBuilder.DropForeignKey(
                name: "FK_properties_SubCategories_subCategoryId",
                table: "properties");

            migrationBuilder.DropIndex(
                name: "IX_properties_categoryId",
                table: "properties");

            migrationBuilder.DropIndex(
                name: "IX_properties_subCategoryId",
                table: "properties");

            migrationBuilder.AlterColumn<int>(
                name: "subCategoryId",
                table: "properties",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "categoryId",
                table: "properties",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_properties_categoryId",
                table: "properties",
                column: "categoryId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_properties_subCategoryId",
                table: "properties",
                column: "subCategoryId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_properties_categories_categoryId",
                table: "properties",
                column: "categoryId",
                principalTable: "categories",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_properties_SubCategories_subCategoryId",
                table: "properties",
                column: "subCategoryId",
                principalTable: "SubCategories",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
