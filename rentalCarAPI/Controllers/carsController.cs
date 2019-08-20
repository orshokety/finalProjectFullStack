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
using rentalCarAPI.filters;
using rentalCarAPI.Models;
using static rentalCarAPI.classes.Helper;

namespace rentalCarAPI.Controllers
{
    [EnableCors("*", "*", "*")]
    public class carsController : ApiController
    {
        private rentalCarEntities db = new rentalCarEntities();

        // GET: api/cars
        
        [Route("api/rentalCar/getAllCars")]
        [BasicAuthentication]
        [HttpGet]
        public HttpResponseMessage getAvailAndProperCars()
        {
            if (Thread.CurrentPrincipal.Identity.AuthenticationType == "Admin")
            {
                List<cars> Cars = db.cars.ToList();

                return Request.CreateResponse(HttpStatusCode.OK, Cars);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }
        
        [Route("api/rentalCar/getAvailAndProperCars")]
        [HttpGet]
        public HttpResponseMessage Getcars()
        {

                List<cars> availAndProperCars = new List<cars>();
                for (int i = 0; i < db.cars.Include(c => c.carTypes).ToList().Count; i++)
                {
                    if (db.cars.Include(c => c.carTypes).ToList()[i].available == "yes" && db.cars.Include(c => c.carTypes).ToList()[i].proper == "yes")
                    {
                        availAndProperCars.Add(db.cars.Include(c => c.carTypes).ToList()[i]);
                    }
                }

                return Request.CreateResponse(HttpStatusCode.OK, availAndProperCars);
            

        }


        //Put: Update a car
        [Route("api/rentalCar/updateACar/{id}")]
        [BasicAuthentication]
        [HttpPut]
        public HttpResponseMessage updateAUser(int id, cars updateCar)
        {
            if (Thread.CurrentPrincipal.Identity.AuthenticationType == "Admin")
            {
                if (db.cars.Any(car => car.id == id))
                {
                    cars car = db.cars.FirstOrDefault(cars => cars.id == id);

                    car.typeNumber = updateCar.typeNumber;
                    car.currentKM = updateCar.currentKM;
                    car.proper = updateCar.proper;
                    car.available = updateCar.available;
                    car.carNumber = updateCar.carNumber;


                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                } 
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            

        }

        //Post : add a  new car
        [Route("api/rentalCar/addACar")]
        [BasicAuthentication]
        [HttpPost]
        public HttpResponseMessage PostUsers(cars car)
        {
            if (Thread.CurrentPrincipal.Identity.AuthenticationType == "Admin")
            {
                cars newcar = new cars();
                newcar.typeNumber = car.typeNumber;
                newcar.currentKM = car.currentKM;
                newcar.proper = car.proper;
                newcar.available = car.available;
                newcar.carNumber = car.carNumber;


                db.cars.Add(newcar);
                db.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

        }


        // DELETE: cars
        [Route("api/rentalCar/deleteACar/{id}")]
        [BasicAuthentication]
        [HttpDelete]
        public HttpResponseMessage DeleteUsers(int id)
        {
            if (Thread.CurrentPrincipal.Identity.AuthenticationType == "Admin")
            {
                cars cars = db.cars.FirstOrDefault(car => car.id == id);
                if (cars == null)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }

                db.cars.Remove(cars);
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

        private bool carsExists(int id)
        {
            return db.cars.Count(e => e.id == id) > 0;
        }
    }
}