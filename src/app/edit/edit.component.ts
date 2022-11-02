import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Todo } from '../entities/todo';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    private http: HttpClient
  ) {
    this. form = new FormGroup({
      description: new FormControl(data.description),
      deadLine:  new FormControl(data.deadLine)
    });
   }

  ngOnInit(): void {
  }

  save() {
    this.data.description = this.form.get('description')?.value;
    this.data.deadLine = this.form.get('deadLine')?.value;
    this.http.put(`todo`, this.data).subscribe(res => {
      this.dialogRef.close(this.data);
    });
  }

  close(){
    this.dialogRef.close(undefined);
  }

}
