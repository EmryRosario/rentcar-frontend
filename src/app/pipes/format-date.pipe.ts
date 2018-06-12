import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let date = new Date(value);

    let day = (date.getDate() + 1) < 10 ? '0' + (date.getDate() + 1) : (date.getDate() + 1);
    let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1 ) : (date.getMonth() + 1);
    let year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

}
