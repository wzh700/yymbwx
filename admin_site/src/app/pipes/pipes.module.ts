import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { BreakfastPipe } from './pipes';

@NgModule({
  declarations:[BreakfastPipe],
  imports:[CommonModule],
  exports:[BreakfastPipe]
})

export class MainPipe{}