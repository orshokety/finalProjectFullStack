using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace rentalCarAPI.classes
{
    public class Helper
    {
        public class userInfo 
        {
            public string fullName;
            public string idNumber;
            public string userName;
            public string password;
            public string userType;
            public string gender;
            public string email;
            public DateTime birthDate;
            public string pic;


        }
        public class loginHelper
        {
            public string username;
            public string password;
        }

        public class Token
        {
            public string token;
        }
        public class Id
        {
            public int id;
        }
        public class nameAndPic
        {
            public string fullName;
            public string pic;
        }
    }
        public class newOrder {

            public string carNumber;
            public DateTime startDate;
            public DateTime endDate;
    }
}