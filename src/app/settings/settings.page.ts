import { Component, OnInit } from '@angular/core';
import { TableService } from '../services/table.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  btn1_c="";
  btn2_c="";
  btn1_l="";
  btn2_l="";
  btn1_c_flag=false;
  btn2_c_flag=false;
  btn1_l_flag=false;
  btn2_l_flag=false;
  p=localStorage.getItem("p")
  b=localStorage.getItem("b")
  p_c=localStorage.getItem("p_c")
  b_c=localStorage.getItem("b_c")
  constructor(public tableService:TableService,public router:Router) { }

  ngOnInit() {
  }

  changeBtn1_c(){
    this.btn1_c_flag=!this.btn1_c_flag;
    this.btn2_c_flag=false;
    this.btn1_l_flag=false;
    this.btn2_l_flag=false;  
  }

  changeBtn2_c(){
    this.btn2_c_flag=!this.btn2_c_flag;
    this.btn1_c_flag=false;
    this.btn1_l_flag=false;
    this.btn2_l_flag=false;  
  }
  changeBtn1_l(){
    this.btn1_l_flag=!this.btn1_l_flag;
    this.btn1_c_flag=false;
    this.btn2_c_flag=false;
    this.btn2_l_flag=false;  
  }
  changeBtn2_l(){
    this.btn2_l_flag=!this.btn2_l_flag;
    this.btn1_c_flag=false;
    this.btn2_c_flag=false;
    this.btn1_l_flag=false;  
  }


  save(){
    if(this.btn2_l!=""){
      localStorage.setItem("b",this.btn2_l)
      this.router.navigate(["/tabs/home"])
      .then(() => {
        window.location.reload();
      });
    }

    if(this.btn1_l!=""){
      localStorage.setItem("p",this.btn1_l)
      this.router.navigate(["/tabs/home"])
      .then(() => {
        window.location.reload();
      });
    }
    if(this.btn1_c!=""){
      if(this.btn1_c=="red"||this.btn1_c=="yellow"||this.btn1_c=="green"||this.btn1_c=="orange"||this.btn1_c=="blue"){
        localStorage.setItem("p_c",this.btn1_c)
        this.router.navigate(["/tabs/home"])
        .then(() => {
          window.location.reload();
        });
      } else{
        alert("enter a valid color")
      }
    }
console.log(this.btn2_c)
    if(this.btn2_c!=""){
      if(this.btn2_c=="blue"||this.btn2_c=="yellow"||this.btn2_c=="green"||this.btn2_c=="orange"||this.btn2_c=="red"){
        localStorage.setItem("b_c",this.btn2_c)
        this.router.navigate(["/tabs/home"])
        .then(() => {
          window.location.reload();
        });
      }else{
        alert("enter a valid color")
      }
    }
  
  
  }

  close(){
    this.router.navigate(["/tabs/home"])

  }
}
