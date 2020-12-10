import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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

  jobApps: JobApplication[];

  dataSource: MatTableDataSource<JobApplication>;
  displayedColumns: string[] = ['jobNumber', 'companyName', 'positionTitle', 'status', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private jobAppService: JobApplicationService
  ) {

  }

  ngOnInit(): void {
    this.jobAppService.getAllJobApplications().subscribe(
      response => {
        let array = response.map(item => { return item });
        this.jobApps = response;
        this.dataSource = new MatTableDataSource(array);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

}
