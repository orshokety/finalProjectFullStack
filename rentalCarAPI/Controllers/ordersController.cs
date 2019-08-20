using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using rentalCarAPI.classes;
using rentalCarAPI.filters;
using rentalCarAPI.Models;
using static rentalCarAPI.classes.Helper;

namespace rentalCarAPI.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ordersController : ApiController
    {
        
        private rentalCarEntities db = new rentalCarEntities();

        // GET: api/orders
        [Route("api/rentalCar/getAllOrders")]
        [BasicAuthentication]
        [HttpGet]
        public HttpResponseMessage getAvailAndProperCars()
        {
            if (Thread.CurrentPrincipal.Identity.AuthenticationType == "Admin"|| Thread.CurrentPrincipal.Identity.AuthenticationType == "Employee")
            {
                List<orders> orders = db.orders.ToList();

                return Request.CreateResponse(HttpStatusCode.OK, orders);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }


        //Put: Update a order
        [Route("api/rentalCar/updateAOrder/{id}")]
        [BasicAuthentication]
        [HttpPut]
        public HttpResponseMessage updateAUser(int id, orders updateOrder)
        {
            if (Thread.CurrentPrincipal.Identity.AuthenticationType == "Admin")
            {
                if (db.orders.Any(order => order.id == id))
                {
                    orders order = db.orders.FirstOrDefault(orders => orders.id == id);

                    order.userIDNumber = updateOrder.userIDNumber;
                    order.carNumber = updateOrder.carNumber;
                    order.startDate = updateOrder.startDate;
                    order.endDate = updateOrder.endDate;
                    order.returnDate = updateOrder.returnDate;


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

        [Route("api/rentalCar/newOrder")]
        [BasicAuthentication]
        [HttpPost]
        public HttpResponseMessage PostUsers(newOrder order)
        {
            if (Thread.CurrentPrincipal.Identity.AuthenticationType == "Admin" || Thread.CurrentPrincipal.Identity.AuthenticationType == "Employee" || Thread.CurrentPrincipal.Identity.AuthenticationType == "Regular")
            {
                string userName = Thread.CurrentPrincipal.Identity.Name;
                string userIDNumber = db.Users.FirstOrDefault(user => user.userName == userName).idNumber;
                orders newOrder = new orders();
                newOrder.carNumber = order.carNumber;
                newOrder.startDate = order.startDate;
                newOrder.endDate = order.endDate;
                newOrder.userIDNumber = userIDNumber;


                db.orders.Add(newOrder);
                db.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        //Post : add a  new order
        [Route("api/rentalCar/addAOrder")]
        [BasicAuthentication]
        [HttpPost]
        public HttpResponseMessage PostUsers(orders order)
        {
            if (Thread.CurrentPrincipal.Identity.AuthenticationType == "Admin" || Thread.CurrentPrincipal.Identity.AuthenticationType == "Employee")
            {
                orders newOrder = new orders();
                newOrder.userIDNumber = order.userIDNumber;
                newOrder.carNumber = order.carNumber;
                newOrder.startDate = order.startDate;
                newOrder.endDate = order.endDate;
                newOrder.returnDate = order.returnDate;


                db.orders.Add(newOrder);
                db.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE: order
        [Route("api/rentalCar/deleteAOrder/{id}")]
        [BasicAuthentication]
        [HttpDelete]
        public HttpResponseMessage DeleteUsers(int id)
        {
            if (Thread.CurrentPrincipal.Identity.AuthenticationType == "Admin")
            {
                orders orders = db.orders.FirstOrDefault(order => order.id == id);
                if (orders == null)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }

                db.orders.Remove(orders);
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

        private bool ordersExists(int id)
        {
            return db.orders.Count(e => e.id == id) > 0;
        }
    }
}