import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkEmpty'
})
export class CheckEmptyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) return value
    return ' '
  }

}
