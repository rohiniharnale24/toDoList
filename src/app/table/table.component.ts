import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DialoguePopUpComponent } from '../dialogue-pop-up/dialogue-pop-up.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToDoService } from '../to-do.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  message: any;
  // dialogueData: any;
  constructor(private _toDO: ToDoService, private _dialog: MatDialog) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getData();
  }
  // ELEMENT_DATA = [{ Title: 1, AssignDate: 'Hydrogen', DueDate: 1.0079 }];
  displayedColumns: string[] = [
    'Title',
    'AssignDate',
    'DueDate',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //on add todo button
  //here we write this to refresh the form after we add the data so we have to pass true at close(true)

  oNAddTodo() {
    let dialoge_Ref = this._dialog.open(DialoguePopUpComponent);
    dialoge_Ref.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.getData();
        }
      },
    });
  }
  // for showing data inside the table call get api
  getData() {
    this._toDO.getFormData().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res); //here we are showing data in table
        this.dataSource.sort = this.sort; //for filter sort
        this.dataSource.paginator = this.paginator; // for paginator
      },
      error: console.log,
    });
  }

  //for deleting data from the table
  oNdeleteToDO(id: number) {
    this._toDO.deleleToDo(id).subscribe({
      next: (res) => {
        Swal.fire('ToDoList Deleted!');
        this.getData();
      },
    });
  }
  //for updating data (this method is for oepning edit form on ui)
  onEdit(data: any) {
    //for edit we must have to open the dialogue box
    let a = this._dialog.open(DialoguePopUpComponent, {
      data: data,
    });

    a.afterClosed().subscribe({
      next: (res) => {
        this.message = res.messageFromPopup;

        setTimeout(() => {
          this.message = '';
        }, 3000);
      },
    });
  }
}
//now updated data is present inside the data but we need to send the data to the form so inside the form we need to use inject token to get the data from table to form
//and to patch the value we use patch method in the ng Oninit of dailogue form
