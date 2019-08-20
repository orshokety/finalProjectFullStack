using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using rentalCarAPI.classes;
using rentalCarAPI.filters;
using rentalCarAPI.Models;
using static rentalCarAPI.classes.Helper;


namespace rentalCarAPI.Controllers
{   [EnableCors("*", "*", "*")]
    public class UsersController : ApiController
    {
        private rentalCarEntities db = new rentalCarEntities();

        // GET all users

        [Route("api/rentalCar/getAllUsers")]
        [BasicAuthentication]
        [HttpGet]
        public HttpResponseMessage GetAllUsers()
        {
            if (Thread.CurrentPrincipal.Identity.AuthenticationType == "Admin")
            {
                List<Users> allUsers = db.Users.ToList();

                return Request.CreateResponse(HttpStatusCode.OK, allUsers);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // GET: Name and Pic
        [Route("api/rentalCar/getNameAndPic")]
        [BasicAuthentication]
        [HttpGet]
        public HttpResponseMessage GetNameAndPic()
        {   
            if (Thread.CurrentPrincipal.Identity.AuthenticationType != null)
            {
                Users users = db.Users.FirstOrDefault(user => user.userName == Thread.CurrentPrincipal.Identity.Name);
                nameAndPic returnVal = new nameAndPic();
                returnVal.fullName = users.fullName;
                returnVal.pic = users.pic;
                return Request.CreateResponse(HttpStatusCode.OK, returnVal);

            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }


        //Put: Update a user
        [Route("api/rentalCar/updateAUser/{id}")]
        [BasicAuthentication]
        [HttpPut]
        public HttpResponseMessage updateAUser(int id, Users updateuser)
        {
            if (Thread.CurrentPrincipal.Identity.AuthenticationType == "Admin")
            {
                if (db.Users.Any(user => user.id == id))
                {
                    Users user = db.Users.FirstOrDefault(users => users.id == id);

                    user.fullName = updateuser.fullName;
                    user.idNumber = updateuser.idNumber;
                    user.userName = updateuser.userName;
                    user.userType = updateuser.userType;
                    user.password = updateuser.password;
                    user.gender = updateuser.gender;
                    user.email = updateuser.email;
                    user.birthDate = updateuser.birthDate;
                    if (updateuser.pic != null && updateuser.pic != "")
                    {
                        user.pic = updateuser.pic;
                    }
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }


        }

        // Login 
        
        [Route("api/rentalCar/login")]
        [HttpPost]
        public HttpResponseMessage login(loginHelper info)
        {
            if (db.Users.Any(user => user.userName == info.username && user.password == info.password))
            {
                return Request.CreateResponse(HttpStatusCode.OK,
                EncodingBase64.EncodeBase64(Encoding.UTF8, info.username + ":" + info.password));

            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }


        }
        // Register
        [Route("api/rentalCar/registerUser")]
        [HttpPost]
        public HttpResponseMessage PostUsers(userInfo user)
        {
           
            Users users = new Users();
            users.fullName = user.fullName;
            users.idNumber = user.idNumber;
            users.userName = user.userName;
            users.password = user.password;
            users.userType = user.userType;
            users.gender = user.gender;
            users.email = user.email;
            users.birthDate = user.birthDate;
            users.pic = user.pic;


            db.Users.Add(users);
            db.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // Get user type
        [Route("api/rentalCar/Type")]
        [HttpPost]
        public HttpResponseMessage Type(Token token)
        {
            if (token.token != null)
            {
                string userType;
                string decodedAuthenticationToken = Encoding.UTF8.GetString(
                      Convert.FromBase64String(token.token));
                string[] usernamePasswordArray = decodedAuthenticationToken.Split(':');
                string username = usernamePasswordArray[0];
                string password = usernamePasswordArray[1];

                userType = db.Users.FirstOrDefault(u => u.userName == username).userType;



                return Request.CreateResponse(HttpStatusCode.OK, userType);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.OK);
            }

        }

        // DELETE: Users
        [Route("api/rentalCar/deleteAUser/{id}")]
        [BasicAuthentication]
        [HttpDelete]
        public HttpResponseMessage DeleteUsers(int id)
        {
            if (Thread.CurrentPrincipal.Identity.AuthenticationType == "Admin")
            {
                Users users = db.Users.FirstOrDefault(user => user.id == id);
                if (users == null)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }

                db.Users.Remove(users);
                db.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UsersExists(int id)
        {
            return db.Users.Count(e => e.id == id) > 0;
        }
    }
}