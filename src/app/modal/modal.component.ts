import { Component, Input, OnInit } from '@angular/core';
import * as math from 'mathjs';
import { ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {


  closeResult:string = '';
  modalOptions:NgbModalOptions;


  data : string[] = [];
  values : string[] = [];

  trackByFn(index: any, item: any) {
    return index; 
  }

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ){
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'foo'
    }
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  open(content: any) {
    this.modalService.open(ModalComponent, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  

  
  // private _modalService: any;
  // public get modalService(): any {
  //   return this._modalService;
  // }
  // public set modalService(value: any) {
  //   this._modalService = value;
  // }


  // constructor(){
    
  // }
 
  input:string = '';
  result:string = '';
  formula:string = '';
  
 
  pressNum(num: string) {
    
    if (num==".") {
      if (this.input !="" ) {
 
        const lastNum=this.getLastOperand()
        console.log(lastNum.lastIndexOf("."))
        if (lastNum.lastIndexOf(".") >= 0) return;
      }
    }

    if (num=="0") {
      if (this.input=="" ) {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+')  {
          return;
      }
    }
 
    this.input = this.input + num
   
    
  }

  pressChar(char: string){

    console.log(this.input);
    if(this.input === char){
      alert('Not valid')
    }
    else{
      this.input = this.input + char;
    }
    
    // const PrevKey = this.input[this.input.length - 1];
    // console.log(this.input);
    // console.log(`PrevKey: ${PrevKey}`);
    // if(PrevKey === char){
    //   alert('Not valid');
    // }


    

  }

  openf() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.my_modal_title = 'I your title';
    modalRef.componentInstance.my_modal_content = 'I am your content';
  }
 
 
  getLastOperand() {
    let pos:number;
    console.log(this.input)
    pos=this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos) pos=this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos) pos=this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > pos) pos=this.input.lastIndexOf("/")
    console.log('Last '+this.input.substr(pos+1))
    return this.input.substr(pos+1)
  }
 
 
  pressOperator(op: string) {
 
    //Do not allow operators more than once
    const lastKey = this.input[this.input.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+')  {
      return;
    }
    if(op === ')'){
      if (lastKey === '('){
        alert('Not valid. Enter some value.')
      }
    }
   
    this.input = this.input + op
    // this.calcAnswer();
  }
 
 
  clear() {
    
    if (this.input !="" ) {
      this.input=this.input.substr(0, this.input.length-1)
    }
  }
 
  allClear() {
    this.result = '';
    this.input = '';
  }
 
  // calcAnswer() {
  //   let formula = this.input;
 
  //   let lastKey = formula[formula.length - 1];
 
  //   if (lastKey === '.')  {
  //     formula=formula.substr(0,formula.length - 1);
  //   }
 
  //   lastKey = formula[formula.length - 1];
 
  //   if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.')  {
  //     formula=formula.substr(0,formula.length - 1);
  //   }

    // let finalFormula = formula;
 
    // console.log("Formula " +finalFormula);
    // try{
    //       const form = math.parse(finalFormula);
    //     if(form.isNode){
    //       console.log('It is executable');
    //     }

    // }
    // catch(e){
    //   console.log('It is not executable');
    // }
    
  //   this.result = eval(formula);
    
  // }

  parse(){
    let finalFormula = this.input;
    
    try{
          const form = math.parse(finalFormula);
          if(form.isNode){
            alert('Validated');
            console.log('Validated');
          }
  
      }
      catch(e){
        alert('Not validated');
        console.log('It is not valid');
      }

     

    
  }

  save(){
    let final = this.input;
    console.log( final );
  }


  sumOf(){

    const arr: number[] = [10, 20, 50];
    
    const result = arr.reduce((accumulator, current) => {
      return accumulator + current;
    }, 0);

    console.log(result); 
    this.input = this.input + `Sumof(${(String(result))})`;

  }


  avgOf(){
    const arr: number[] = [20, 20, 50];
    
    const result = arr.reduce((accumulator, current) => {
      return (accumulator + current)/arr.length;
    }, 0);

    console.log(result); 
    this.input = this.input +`Avgof(${(String(result))})`;
  }

  store(newValue: any){
    this.data.push(newValue);
    console.log(this.data);
    
  }

  stack(value:any){
    this.values.push(value);
    console.log(this.values);
  }

 
  
getAnswer(): void {
    // this.calcAnswer();
    this.input = this.result;
    if (this.input=="0") this.input="";
  }

  // open(content: any) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason: any) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

}
