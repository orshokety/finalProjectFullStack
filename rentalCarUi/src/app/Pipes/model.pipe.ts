import { Pipe, PipeTransform } from '@angular/core';
import { car } from '../Helpers/carAndTypes';

@Pipe({
  name: 'model'
})
export class ModelPipe implements PipeTransform {

  transform(items: car[], gear : string, maker : string, year : string  ): any[] {
    var Filter = items;
    var uniqueFilter: Array<string> = Array<string>();
    if (gear && gear!="all" || maker && maker!="all"|| year && year!="all") {
      
    

      if(gear && gear!="all"){
        Filter = Filter.filter(it => {
        
          if (it.carTypes.gear == gear ){
           return it;
          }
       }) 
      }
      if(maker && maker!="all"){
        Filter = Filter.filter(it => {
        
          if (it.carTypes.maker == maker ){
           return it;
          }
       }) 
     }
     if (year && year!="all") {
      Filter = Filter.filter(it => {
        
        if (it.carTypes.year == year ){
         return it;
        }
     }) 
   
   
  }
  for (let index = 0; index < Filter.length; index++) {
    if (!uniqueFilter.includes(Filter[index].carTypes.model)) {
      uniqueFilter.push(Filter[index].carTypes.model)
    }
  }
}
else { 
  for (let index = 0; index < Filter.length; index++) {
    if (!uniqueFilter.includes(Filter[index].carTypes.model)) {
      uniqueFilter.push(Filter[index].carTypes.model)
    }
  }
  }
  uniqueFilter.push("all")
      return uniqueFilter;
   
  
  
    }
}
