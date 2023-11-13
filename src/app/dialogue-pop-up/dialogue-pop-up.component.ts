import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToDoService } from '../to-do.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TableComponent } from '../table/table.component';
import Swal from 'sweetalert2';

// or via CommonJS
// const Swal = require('sweetalert2')
@Component({
  selector: 'app-dialogue-pop-up',
  templateUrl: './dialogue-pop-up.component.html',
  styleUrls: ['./dialogue-pop-up.component.scss'],
})
export class DialoguePopUpComponent implements OnInit {
  toDoObj!: string;
  toDoForm!: FormGroup;
  dialogue_Data!: any;
  constructor(
    private _todo: ToDoService,
    private _fb: FormBuilder,
    public dialogueRef: MatDialogRef<DialoguePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public updateItemDataFromTable: any //to fetch all te data inside the dialogue box data: type any matters  to fetch data values so put it any
  ) {}
  ngOnInit(): void {
    this.toDoForm = this._fb.group({
      position: new FormControl(null, []),
      Title: new FormControl(null, []),
      AssignDate: new FormControl(null, []),
      DueDate: new FormControl(null, []),
      status: new FormControl(null, []),
      // action: new FormControl(null, []),
    });
    if (this.updateItemDataFromTable) {
      this.toDoForm.patchValue(this.updateItemDataFromTable);
    }
    // this.ontoDoListsubmit();
    console.log('data', this.updateItemDataFromTable);
  }
  statusArray = [
    { value: 'Active-0', viewValue: 'Active' },
    { value: 'close-1', viewValue: 'Close' },
    { value: 'Archive-2', viewValue: 'Archive' },
  ];

  // toDoListForm() {

  // }

  // ontoDoListsubmit() {
  //   if (this.toDoForm.valid) {
  //   }
  // }

  onSaveData() {
    if (this.toDoForm.valid) {
      this._todo.saveToDoList(this.toDoForm.value).subscribe((res) => {
        console.log(res);
      });
      this._todo.getFormData().subscribe({
        next: (res) => {
          console.log(res);

          //if we pass true our list is get updated
          this.dialogueRef.close(true);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  onUpdateData() {
    this._todo
      .updateToDo(this.updateItemDataFromTable.id, this.toDoForm.value)
      .subscribe({
        next: (data) => {
          console.log(data);
          // alert('toDo updated');

          Swal.fire('ToDoList Updated!');
          this.dialogueRef.close({
            messageFromPopup:
              'updated data id is ' + this.updateItemDataFromTable.id,
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
