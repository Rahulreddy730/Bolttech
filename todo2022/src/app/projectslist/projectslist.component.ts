import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardTitle,
} from "@angular/material/card";
import { ProjectsService } from "../projects/projects.service";
import { Project } from "./project";
import { Router } from "@angular/router";
import { AuthService } from "../login/auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-projectslist",
  templateUrl: "./projectslist.component.html",
  styleUrls: ["./projectslist.component.css"],
})
export class ProjectslistComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "title",
    "description",
    "edit",
    "delete",
  ];
  dataSource = new MatTableDataSource<Project>();

  selectedProduct: Project = new Project();
  loading = false;
  public isAuthenticated: Observable<boolean>;

  constructor(
    public projectsService: ProjectsService,
    public router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.refresh();
    this.isAuthenticated = this.authService.isLoggedIn();
  }

  async refresh() {
    this.loading = true;
    this.projectsService.getAll().subscribe((projects) => {
      this.dataSource.data = projects;
    });
    this.loading = false;
  }

  updateProduct() {
    console.log("selected project ", this.selectedProduct);
    this.loading = true;
    if (this.selectedProduct.id !== undefined) {
      this.projectsService
        .saveProject(this.selectedProduct)
        .subscribe((pro) => {
          let updateProject = this.dataSource.data.map((project) => {
            if (pro.id === project.id) {
              project = pro;
            }
          });
        });

    } else {
      this.projectsService
        .createProject(this.selectedProduct)
        .subscribe((pro) => {
          this.dataSource.data.push(pro);
        });

    }
    this.selectedProduct = new Project();
    this.refresh();
  }

  editProduct(product: Project) {
    this.selectedProduct = product;
  }

  clearProduct() {
    this.selectedProduct = new Project();
  }

  deleteProduct(product: Project) {
    this.loading = true;
    if (
      confirm(
        `Are you sure you want to delete the product ${product.name}. This cannot be undone.`
      )
    ) {
      this.projectsService.deleteProject(product).subscribe(() => {
        console.log("deleted");
      });
    }
    this.refresh();
    //this.router.navigate(['projectslist']);
  }
}
