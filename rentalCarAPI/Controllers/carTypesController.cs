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
using System.Web.Http.Description;
using rentalCarAPI.filters;
using rentalCarAPI.Models;
using static rentalCarAPI.classes.Helper;

namespace rentalCarAPI.Controllers
{
    public class carTypesController : ApiController
    {
        private rentalCarEntities db = new rentalCarEntities();

        // GET: api/carTypes
        [Route("api/rentalCar/getAllCarTypes")]
        [BasicAuthentication]
        [HttpGet]
        public HttpResponseMessage getAvailAndProperCars()
        {
            if (Thread.CurrentPrincipal.Identity.AuthenticationType == "Admin")
            {
                List<carTypes> carTypes = db.carTypes.ToList();

                return Request.CreateResponse(HttpStatusCode.OK, carTypes);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        //Put: Update a car type
        [Route("api/rentalCar/updateACarType/{id}")]
        [BasicAuthentication]
        [HttpPut]
        public HttpResponseMessage updateAUser(int id, carTypes updateCarType)
        {
            if (Thread.CurrentPrincipal.Identity.AuthenticationType == "Admin")
            {
                if (db.carTypes.Any(car => car.id == id))
                {
                    carTypes carType = db.carTypes.FirstOrDefault(cars => cars.id == id);

                    carType.maker = updateCarType.maker;
                    carType.model = updateCarType.model;
                    carType.dailyCost = updateCarType.dailyCost;
                    carType.costOfOverdue = updateCarType.costOfOverdue;
                    carType.gear = updateCarType.gear;
                    carType.year = updateCarType.year;
                    if (updateCarType.photo != null && updateCarType.photo != "")
                    {
                        carType.photo = updateCarType.photo;

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
        //Post : add a  new carType
        [Route("api/rentalCar/addACarType")]
        [BasicAuthentication]
        [HttpPost]
        public HttpResponseMessage PostUsers(carTypes carTypes)
        {
            if (Thread.CurrentPrincipal.Identity.AuthenticationType == "Admin")
            {
                carTypes newcarTypes = new carTypes();
                newcarTypes.maker = carTypes.maker;
                newcarTypes.model = carTypes.model;
                newcarTypes.year = carTypes.year;
                newcarTypes.gear = carTypes.gear;
                newcarTypes.dailyCost = carTypes.dailyCost;
                newcarTypes.costOfOverdue = carTypes.costOfOverdue;
                newcarTypes.photo = carTypes.photo;


                db.carTypes.Add(newcarTypes);
                db.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

        }

        // DELETE: carTypes
        [Route("api/rentalCar/deleteACarType/{id}")]
        [BasicAuthentication]
        [HttpDelete]
        public HttpResponseMessage DeleteUsers(int id)
        {
            if (Thread.CurrentPrincipal.Identity.AuthenticationType == "Admin")
            {
                string carError = "cant delete, there is car in that type";
                carTypes carTypes = db.carTypes.FirstOrDefault(carType => carType.id == id);
                if (carTypes == null)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }
                else if (db.cars.Any(car => car.typeNumber == id))
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, carError);
                }

                db.carTypes.Remove(carTypes);
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

        private bool carTypesExists(int id)
        {
            return db.carTypes.Count(e => e.id == id) > 0;
        }
    }
}