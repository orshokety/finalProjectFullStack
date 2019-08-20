import { Pipe, PipeTransform } from '@angular/core';
import { car } from '../Helpers/carAndTypes';

@Pipe({
  name: 'gear'
})
export class GearPipe implements PipeTransform {

  transform(items: car[], model : string, maker : string, year : string  ): any[] {
    var Filter = items;
    var uniqueFilter: Array<string> = Array<string>();
    if (model && model!="all" || maker && maker!="all"|| year && year!="all") {
      
    

      if(model && model!="all"){
        Filter = Filter.filter(it => {
        
          if (it.carTypes.model == model ){
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
    if (!uniqueFilter.includes(Filter[index].carTypes.gear)) {
      uniqueFilter.push(Filter[index].carTypes.gear)
    }
  }
}
else { 
  for (let index = 0; index < Filter.length; index++) {
    if (!uniqueFilter.includes(Filter[index].carTypes.gear)) {
      uniqueFilter.push(Filter[index].carTypes.gear)
    }
  }
  }
  uniqueFilter.push("all")
      return uniqueFilter;
  
  
  
    }
}
