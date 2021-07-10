using Back_End.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Back_End.Extensions
{
  public static class ExtensionMethods
  {    
    public static IQueryable<Property> RealStatefiltering(Dictionary<string,filterObject> filterKeys,IQueryable<Property> query)
    {
      var resultQuery = query;
      foreach (var key in filterKeys)
      {
        switch (key.Key)
        {
          case "Name":
            resultQuery = resultQuery.Where(x => x.Name.Contains(key.Value.singleValue));
            break;

          case "NoOfRooms":
            resultQuery = resultQuery.Where(x => x.NoOfRooms ==Convert.ToInt32( key.Value.singleValue));
            break;
          case "Price":
            if (key.Value.valueFrom!=null && key.Value.valueFrom != "")
            {
              resultQuery = resultQuery.Where(x => x.Price >= Convert.ToInt32(key.Value.valueFrom));
            }
            if (key.Value.valueTo!=null && key.Value.valueTo != "")
            {
              resultQuery = resultQuery.Where(x => x.Price <= Convert.ToInt32(key.Value.valueTo));
            }
            break;
          case "area":
            if (key.Value.valueFrom != null && key.Value.valueFrom != "")
            {
              resultQuery = resultQuery.Where(x => x.area > Convert.ToInt32(key.Value.valueFrom));
            }
            if (key.Value.valueTo != null && key.Value.valueTo != "")
            {
              resultQuery = resultQuery.Where(x => x.area > Convert.ToInt32(key.Value.valueTo));
            }
            break;
          case "buildingAge":
            if (key.Value.valueFrom != null && key.Value.valueFrom != "")
            {
              resultQuery = resultQuery.Where(x => x.buildingAge > Convert.ToInt32(key.Value.valueFrom));
            }
            if (key.Value.valueTo != null && key.Value.valueTo != "")
            {
              resultQuery = resultQuery.Where(x => x.buildingAge > Convert.ToInt32(key.Value.valueTo));
            }
            break;
          case "categoryId":
            resultQuery = resultQuery.Where(x => x.category.id==Convert.ToInt32(key.Value.singleValue));
            break;
          default:
            resultQuery = query;
            break;
        }
      }
      return resultQuery;
    }


    public static IQueryable<car> Carsfiltering(Dictionary<string, filterObject> filterKeys, IQueryable<car> query)
    {
      var resultQuery = query;
      foreach (var key in filterKeys)
      {
        switch (key.Key)
        {
          case "modelName":
            resultQuery = resultQuery.Where(x => x.modelName.Contains(key.Value.singleValue));
            break;

          case "isAuto":
            resultQuery = resultQuery.Where(x => x.isAuto == Convert.ToBoolean(key.Value.singleValue));
            break;
          case "isHeavy":
            resultQuery = resultQuery.Where(x => x.isHeavy == Convert.ToBoolean(key.Value.singleValue));
            break;
          case "price":
            if (key.Value.valueFrom != null && key.Value.valueFrom != "")
            {
              resultQuery = resultQuery.Where(x => x.price >= Convert.ToInt32(key.Value.valueFrom));
            }
            if (key.Value.valueTo != null && key.Value.valueTo != "")
            {
              resultQuery = resultQuery.Where(x => x.price <= Convert.ToInt32(key.Value.valueTo));
            }
            break;
          case "modelYear":
            if (key.Value.valueFrom != null && key.Value.valueFrom != "")
            {
              resultQuery = resultQuery.Where(x => x.modelYear > Convert.ToInt32(key.Value.valueFrom));
            }
            if (key.Value.valueTo != null && key.Value.valueTo != "")
            {
              resultQuery = resultQuery.Where(x => x.modelYear > Convert.ToInt32(key.Value.valueTo));
            }
            break;
          case "lostAmount":
            if (key.Value.valueFrom != null && key.Value.valueFrom != "")
            {
              resultQuery = resultQuery.Where(x => x.lostAmount > Convert.ToInt32(key.Value.valueFrom));
            }
            if (key.Value.valueTo != null && key.Value.valueTo != "")
            {
              resultQuery = resultQuery.Where(x => x.lostAmount > Convert.ToInt32(key.Value.valueTo));
            }
            break;
          case "carCompanyId":
            resultQuery = resultQuery.Where(x => x.carCompanyId == Convert.ToInt32(key.Value.singleValue));
            break;
          default:
            resultQuery = query;
            break;
        }
      }
      return resultQuery;
    }

    public static IQueryable<T> ApplySorting<T>(IQueryable<T>query, sort sort, Dictionary<string, Expression<Func<T, object>>> columnsMap)
    {
      if (sort.isAsec)
      {        
        return query.OrderBy(columnsMap[sort.sortBy]);
      }
      else
      {
        return query.OrderByDescending(columnsMap[sort.sortBy]);
      }
    }

    public static IQueryable<T> ApplyPaging<T>(IQueryable<T> query,pagination pagination)
    {
      if (pagination.pageSize<=0)
      {
        pagination.pageSize = 10;
      }

      return query.Skip((pagination.pageNumber - 1) * pagination.pageSize).Take(pagination.pageSize);
    }
  }
}
