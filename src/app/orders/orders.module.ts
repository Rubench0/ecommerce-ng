import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { ListComponent } from './components/list/list.component';
import { ToolbarComponent } from '../utils/toolbar/toolbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ItemsOrderComponent } from './components/items-order/items-order.component';

@NgModule({
  declarations: [
    ListComponent,
    ToolbarComponent,
    ItemsOrderComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatDialogModule,
    MatListModule
  ]
})
export class OrdersModule { }
