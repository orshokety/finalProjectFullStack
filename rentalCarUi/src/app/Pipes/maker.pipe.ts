import { Pipe, PipeTransform } from '@angular/core';
import { car } from '../Helpers/carAndTypes';

@Pipe({
  name: 'maker'
})
export class MakerPipe implements PipeTransform {

  transform(items: car[], model:string , gear : string, year : string  ): any[] {
    var Filter = items;
    var uniqueFilter: Array<string> = Array<string>();
    if (gear && gear!="all" || model  && model!="all" || year && year!="all") {
      
      if(model && model!="all"){
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

     if (year && year!="all") {
  
      Filter = Filter.filter(it => {
        
        if (it.carTypes.year == year ){
         return it;
        }
     }) 
   
  }
  for (let index = 0; index < Filter.length; index++) {
    if (!uniqueFilter.includes(Filter[index].carTypes.maker)) {
      uniqueFilter.push(Filter[index].carTypes.maker)
    }
  }

}
else { 
  for (let index = 0; index < Filter.length; index++) {
    if (!uniqueFilter.includes(Filter[index].carTypes.maker)) {
      uniqueFilter.push(Filter[index].carTypes.maker)
    }
  }
  }
  uniqueFilter.push("all")
      return uniqueFilter;
  
  
  
    }
}


