import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    if(localStorage.getItem("p")==null){
      localStorage.setItem("p","P")
      console.log("p")
    } 
    if(localStorage.getItem("b")==null){
      localStorage.setItem("b","B")
      console.log("b")

    } 

    if(localStorage.getItem("b_c")==null){
      localStorage.setItem("b_c","red")

    } 

    if(localStorage.getItem("p_c")==null){
      localStorage.setItem("p_c","blue")

    } 


  }
}
