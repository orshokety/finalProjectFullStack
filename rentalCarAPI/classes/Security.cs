using rentalCarAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace rentalCarAPI.classes
{
    public static class Security
    { public static rentalCarEntities db = new rentalCarEntities();
        public static bool Login(string userName, string password)
        {
            if (db.Users.Any(user => user.userName == userName && user.password == password))
            {
                
                return true;

            }
            else
            {
                return false;
            }
               
        }
    }
}