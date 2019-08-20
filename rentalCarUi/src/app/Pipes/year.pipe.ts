import { Pipe, PipeTransform } from '@angular/core';
import { car } from '../Helpers/carAndTypes';

@Pipe({
  name: 'year'
})
export class YearPipe implements PipeTransform {

  transform(items: car[], maker : string, model : string, gear : string  ): any[] {
    var Filter = items;
    var uniqueFilter: Array<string> = Array<string>();
    if (maker && maker!="all" || model && model!="all"|| gear && gear!="all") {
      
      if(maker && maker!="all"){
        Filter = Filter.filter(it => {
        
          if (it.carTypes.maker == maker ){
           return it;
          }
       }) 
     }

     if (model && model!="all") {
      Filter = Filter.filter(it => {
        
        if (it.carTypes.model == model ){
         return it;
        }
     }) 
   
    }

    if(gear && gear!="all"){
      Filter = Filter.filter(it => {
      
        if (it.carTypes.gear == gear ){
         return it;
        }
     }) 
    }
  
  for (let index = 0; index < Filter.length; index++) {
    if (!uniqueFilter.includes(Filter[index].carTypes.year)) {
      uniqueFilter.push(Filter[index].carTypes.year)
    }
  }
}
else { 
  for (let index = 0; index < Filter.length; index++) {
    if (!uniqueFilter.includes(Filter[index].carTypes.year)) {
      uniqueFilter.push(Filter[index].carTypes.year)
    }
  }
  }
  uniqueFilter.push("all")
      return uniqueFilter;
   
  
  
  
  }
}