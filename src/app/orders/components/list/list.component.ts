import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/utils/interfaces/Order';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/services/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from 'src/app/utils/snack/snack.component';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/orders/components/dialog/dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  public dataSource: MatTableDataSource<Order>;
  public displayedColumns: string[] = ['order_date', 'delivery_date', 'priority', 'state_order', 'id'];
  public durationSnack: number = 5;
  public dalivery_date: string = null;
  public pipe = new DatePipe('en-US');
  public selectElement: Order;

  constructor(
    private _orderService: OrdersService,
    private _spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private _authService: AuthServiceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  onFilterOrder() {
    this.dalivery_date = this.pipe.transform(this.dalivery_date, 'yyyy-MM-dd');
    this.getOrders();
  }

  getOrders(): void {
    this._spinner.show();
    this._orderService.getOrders(this.dalivery_date).subscribe(
      (response: any) => {
        if (response.status === 'El token es invalido' || response.status === 'El token ha expirado') {
          this._snackBar.openFromComponent(SnackComponent, {
            duration: this.durationSnack * 1000,
            data: {message: response.status}
          });
          this._authService.signOut();
        } else {
          if (response.length > 0) {
            this.dataSource = new MatTableDataSource<Order>(response);
          } else {
            const NotResult: Order[] = [{id: 0, order_date: '', delivery_date: 'No hay resultados', priority: { id: 0, name: ''}, state_order: { id: 0, name: ''}, inventories: []}
            ];
            this.dataSource = new MatTableDataSource<Order>(NotResult);
          }
        }
        this._spinner.hide();
      },
      (error: any) => {
        this._spinner.hide();
        this._snackBar.openFromComponent(SnackComponent, {
          duration: this.durationSnack * 1000,
          data: {message: error.error.message}
        });
      }
    );
  }

  openDialog(id: number): void {
    if (id) {
      this._orderService.getOrder(id).subscribe(
        (response: any) => {
          this.selectElement = response;
          this._spinner.hide();
          this.dialog.open(DialogComponent, {
            width: '70%',
            data: this.selectElement
          });
        },
        (error: any) => {
          this._spinner.hide();
          this._snackBar.openFromComponent(SnackComponent, {
            duration: this.durationSnack * 1000,
            data: {message: error.error.message}
          });
        }
      );
      
    }

  }

}
