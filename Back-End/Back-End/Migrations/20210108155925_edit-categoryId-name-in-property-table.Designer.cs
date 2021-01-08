﻿// <auto-generated />
using System;
using Back_End.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Back_End.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210108155925_edit-categoryId-name-in-property-table")]
    partial class editcategoryIdnameinpropertytable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("Back_End.Models.Property", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NoOfRooms")
                        .HasColumnType("int");

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.Property<string>("adOwner")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("area")
                        .HasColumnType("int");

                    b.Property<int>("buildingAge")
                        .HasColumnType("int");

                    b.Property<int>("buildingFloors")
                        .HasColumnType("int");

                    b.Property<int?>("categoryId")
                        .HasColumnType("int");

                    b.Property<string>("city")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("date")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("floor")
                        .HasColumnType("int");

                    b.Property<int>("heatingId")
                        .HasColumnType("int");

                    b.Property<bool>("inSite")
                        .HasColumnType("bit");

                    b.Property<bool>("isFurnished")
                        .HasColumnType("bit");

                    b.Property<int>("proceeds")
                        .HasColumnType("int");

                    b.Property<string>("provience")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("secondSubCategoryId")
                        .HasColumnType("int");

                    b.Property<string>("street")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("subCategoryId")
                        .HasColumnType("int");

                    b.Property<int>("typeId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("categoryId")
                        .IsUnique()
                        .HasFilter("[categoryId] IS NOT NULL");

                    b.HasIndex("heatingId");

                    b.HasIndex("secondSubCategoryId")
                        .IsUnique()
                        .HasFilter("[secondSubCategoryId] IS NOT NULL");

                    b.HasIndex("subCategoryId")
                        .IsUnique()
                        .HasFilter("[subCategoryId] IS NOT NULL");

                    b.HasIndex("typeId");

                    b.ToTable("properties");
                });

            modelBuilder.Entity("Back_End.Models.SecondSubCategory", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("subCategoryId")
                        .HasColumnType("int");

                    b.Property<string>("subCategoryName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("subCategoryId");

                    b.ToTable("SecondSubCategories");
                });

            modelBuilder.Entity("Back_End.Models.carousel", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("picture")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("carousels");
                });

            modelBuilder.Entity("Back_End.Models.category", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("category_Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("categories");
                });

            modelBuilder.Entity("Back_End.Models.heating", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("heatingName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("heatings");
                });

            modelBuilder.Entity("Back_End.Models.subCategory", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("subCategoryName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("CategoryId");

                    b.ToTable("SubCategories");
                });

            modelBuilder.Entity("Back_End.Models.type", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("typeName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("types");
                });

            modelBuilder.Entity("Back_End.Models.user", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("userEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("userName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("users");
                });

            modelBuilder.Entity("Back_End.Models.Property", b =>
                {
                    b.HasOne("Back_End.Models.category", "category")
                        .WithOne("Property")
                        .HasForeignKey("Back_End.Models.Property", "categoryId");

                    b.HasOne("Back_End.Models.heating", "heating")
                        .WithMany("properties")
                        .HasForeignKey("heatingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Back_End.Models.SecondSubCategory", "SecondSubCategory")
                        .WithOne("Property")
                        .HasForeignKey("Back_End.Models.Property", "secondSubCategoryId");

                    b.HasOne("Back_End.Models.subCategory", "subCategory")
                        .WithOne("Property")
                        .HasForeignKey("Back_End.Models.Property", "subCategoryId");

                    b.HasOne("Back_End.Models.type", "type")
                        .WithMany("properties")
                        .HasForeignKey("typeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("category");

                    b.Navigation("heating");

                    b.Navigation("SecondSubCategory");

                    b.Navigation("subCategory");

                    b.Navigation("type");
                });

            modelBuilder.Entity("Back_End.Models.SecondSubCategory", b =>
                {
                    b.HasOne("Back_End.Models.subCategory", "subCategory")
                        .WithMany("secondSubCategories")
                        .HasForeignKey("subCategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("subCategory");
                });

            modelBuilder.Entity("Back_End.Models.subCategory", b =>
                {
                    b.HasOne("Back_End.Models.category", "category")
                        .WithMany("subCategories")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("category");
                });

            modelBuilder.Entity("Back_End.Models.SecondSubCategory", b =>
                {
                    b.Navigation("Property");
                });

            modelBuilder.Entity("Back_End.Models.category", b =>
                {
                    b.Navigation("Property");

                    b.Navigation("subCategories");
                });

            modelBuilder.Entity("Back_End.Models.heating", b =>
                {
                    b.Navigation("properties");
                });

            modelBuilder.Entity("Back_End.Models.subCategory", b =>
                {
                    b.Navigation("Property");

                    b.Navigation("secondSubCategories");
                });

            modelBuilder.Entity("Back_End.Models.type", b =>
                {
                    b.Navigation("properties");
                });
#pragma warning restore 612, 618
        }
    }
}
