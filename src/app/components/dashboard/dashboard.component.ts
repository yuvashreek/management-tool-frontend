import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JobApplication } from 'src/app/model/JobApplication';
import { JobApplicationService } from 'src/app/services/job-application.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  jobApp = new JobApplication();
  jobAppForm: FormGroup;
  dataSource: MatTableDataSource<JobApplication>;
  displayedColumns: string[] = ['jobNumber', 'companyName', 'positionTitle', 'status', 'actions'];
  statusOptions: string[] = ['Applied', 'Inprocess', 'HR round', 'Coding round', 'Resume review', 'Got offer', 'Rejected']
  selectedStatus = this.statusOptions[0];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private jobAppService: JobApplicationService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.updateDataSource();
    // this.jobAppForm = new FormGroup({
    //   companyName: new FormControl(''),
    //   positionTitle: new FormControl(''),
    //   status: new FormControl(''),
    //   jobUrl: new FormControl(''),
    //   location: new FormControl(''),
    //   description: new FormControl('')
    // });
    this.jobAppForm = this.formBuilder.group({
      companyName: [],
      positionTitle: [null, Validators.required],
      status: [null, Validators.required],
      jobUrl: [null, Validators.required],
      location: [],
      description: [],
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteRecord(jobApp: JobApplication) {
    this.jobAppService.deleteJobApplications(jobApp.jobNumber).subscribe(
      response => {

        //console.log(response);
      }
    )
    this.updateDataSource();

  }

  submit() {
    if (!this.jobAppForm.valid) {
      return;
    }
    this.jobApp = this.jobAppForm.value;
    this.jobAppForm.clearValidators();
    //console.log(this.jobApp);
    this.jobAppService.addJobApplication(this.jobApp).subscribe(
      response => {
        //console.log(response);
      }
    );
    this.updateDataSource();
  }

  updateDataSource() {
    this.jobAppService.getAllJobApplications().subscribe(
      response => {
        let array = response.map(item => { return item });
        this.dataSource = new MatTableDataSource(array);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

}
