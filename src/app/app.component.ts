import { Component,OnInit,ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ MatInputModule,MatPaginatorModule,MatSortModule,MatTableModule,HttpClientModule,CommonModule, RouterOutlet,MatToolbarModule,MatIconModule,MatButtonModule,MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  title = 'RestAppJS';

  public  keyword: string="";
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','dob','gender','education','company','experience','package','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit():void{
  this.getEmployeeList()
  }

  constructor(private _dialog:MatDialog, private _http:HttpClient){}

  openAddEditEmpForm(){
   const dialogRef= this._dialog.open(EmpAddEditComponent);
   dialogRef.afterClosed().subscribe(
    {
      next:(val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    }
   )
  }

  getEmployeeList(){
    return this._http.get('http://localhost:3000/employees').subscribe(
      {
        next: (res:any) => {
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.sort= this.sort;
       this.dataSource.paginator=this.paginator;

        },error:(err)=>{
          console.log(err);
        }
      }
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmployee(id:number){
    return this._http.delete(`http://localhost:3000/employees/${id}`).subscribe(
      {
        next: (res) => {
     alert('employee deleted successfully');
     this.getEmployeeList();

        },error:(err)=>{
          console.log(err);
        }
      }
    )
  }
  openEditForm(data:any){
   const dialogRef= this._dialog.open(EmpAddEditComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe(
      {
        next:(val)=>{
          if(val){
            this.getEmployeeList();
          }
        }
      }
     )
  }
 
}
