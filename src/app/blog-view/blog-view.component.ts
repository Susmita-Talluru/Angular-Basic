import { Component, OnInit } from '@angular/core';


// importing route related code
import { ActivatedRoute, Router } from "@angular/router";
import { BlogService } from '../blog.service';

import { BlogHttpService } from '../blog-http.service';

import { ToastrService } from 'ngx-toastr';

import { Location } from '@angular/common';


@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css'],
  providers: [Location]
})
export class BlogViewComponent implements OnInit  {

  //empty object
  public currentBlog;

  

  constructor(private _route: ActivatedRoute, private router: Router, public blogService:BlogService,public blogHttpService:BlogHttpService,private toastr: ToastrService, private location: Location) {
    console.log("blog-view constructor is called");
   }

  ngOnInit() {
    console.log("blog-view ngOnInit Called");
    //getting the blog id from the route
    let myBlogId = this._route.snapshot.paramMap.get("blogId");
    console.log(myBlogId);
    
    //calling the function to get the blog with this blogId out of the overall array
    
    this.blogHttpService.getSingleBlogInformation(myBlogId).subscribe(

      data => {
        console.log(data);
        this.currentBlog = data["data"];

      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage)
      }
    )
    
  }

  public deleteThisBlog(): any {
    
    this.blogHttpService.deleteBlog(this.currentBlog.blogId).subscribe(

      data => {
        console.log(data);
        this.toastr.success('Blog Deleted successfully', 'Success!');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000)
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
        this.toastr.error('Some error occured', 'Error');
      }
    )

  } // end delete this blog

  public goBackToPreviousPage(): any {
    this.location.back();
  }
}