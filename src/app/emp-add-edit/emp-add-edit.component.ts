import { Component ,OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions ,MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {  DateAdapter, MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { NgForOf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inject } from '@angular/core';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatDialogActions,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.css'
})
export class EmpAddEditComponent implements OnInit{
  empForm:FormGroup;

  education:string[] =[
    'Baccaleaureat',
    'Master',
    'MBDS',
    'I2A',
    'Doctorat',
  ]

constructor( private _fb:FormBuilder,
  private _http:HttpClient,
  private _dialogRef:MatDialogRef<EmpAddEditComponent>,
  @Inject(MAT_DIALOG_DATA)public  data:any
  ){
  this.empForm=this._fb.group({
    firstName:'',
    lastName:'',
    email:'',
    dob:'',
    gender:'',
    education:'',
    company:'',
    experience:'',
    package:''
  })

}
ngOnInit(): void {
  this.empForm.patchValue(this.data);
}


onFormSubmit(){
  if(this.empForm.valid){
    if(this.data){
      
this.updateEmployee(this.data.id,this.empForm.value).subscribe(
  {
    next:(val:any)=>{
 alert('Employee updated successsfully');
 this._dialogRef.close(true);}
    ,
    error:(err:any)=>{
      console.log(err);
    }
  }
)
    }
 else{
      const employee= this.empForm.value;
      this._http.post('http://localhost:3000/employees',employee).subscribe(
        {
          next:(val:any)=>{
       alert('Employe added successsfully');
       this._dialogRef.close(true);}
          ,
          error:(err:any)=>{
            console.log(err);
          }
        }
      )

    }
   
  }
}
updateEmployee(id:number,data:any): Observable<any>{
  return this._http.put(`http://localhost:3000/employees/${id}`, data);
}

}


