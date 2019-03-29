import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'breakfastPipe' })
export class BreakfastPipe implements PipeTransform {
  transform(value: boolean): string {
    if (value) return "包含" ;
    if (!value) return "不包含"; 
  }
}

