import { Pipe, PipeTransform } from '@angular/core';
import { car } from '../Helpers/carAndTypes';

@Pipe({
  name: 'searchCar'
})
export class SearchCarPipe implements PipeTransform {

  transform(items: car[], model: string , gear : string, maker : string, year : string , searchText : string ): any[] {
    var Filter = items;
    if(searchText){
     var newValue = searchText.toLocaleLowerCase();
      return Filter.filter( it => {
        return it.carTypes.maker.includes(newValue) || it.carTypes.model.includes(newValue)
        || it.carTypes.gear.includes(newValue)
      });
    }
      if(model && model!="all"){
        Filter = Filter.filter(it => {
      return it.carTypes.model == model
      }) 
      }
  
      if(gear && gear!="all"){
        Filter= Filter.filter(it => {
        return it.carTypes.gear == gear
      })
      }
      if(maker && maker!="all"){
       Filter = Filter.filter(it => {
        return it.carTypes.maker == maker
      })
     }
     if (year && year!="all") {
  
    Filter = Filter.filter(it => {
     return it.carTypes.year == year
   })
  }
  
      return Filter;
  
  
  
    }
  }