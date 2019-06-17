import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
//import axios from 'axios';
//import generate from '@babel/generator';




const Container =styled.div`


background-color:grey;
padding:16px;
width: 100%;
height: 20rem;
top:0;
right: 0;
bottom: 0;
left: 0;
margin: auto;
display:none;
z-index:999;
transition: top 0.5s ease;
display:${props=>props.imagedisplay}rem;

img{
   
    width: 40%;
    max-width: 40%;
    height: 90%;
    display: block;
    margin: 0 auto;
    border: 4px solid black;
 
   
    

;}

>
`;


class Gallery extends Component {
 

     constructor(props) {
        super(props);
    
        this.state = { 
            loading:true,
            images:[],
            currentimagesrc:"",
            nextimagesrs:"",
            nextimageright:-100,
            previmagesrc:"",
            imagedisplay:"none"
    
         }
    
        this.ImgMouseOver = this.ImgMouseOver.bind(this);
        this.ImgMouseOut = this.ImgMouseOut.bind(this);
        this.ImgClick = this.ImgClick.bind(this);
        this.ClsBtnClick = this.ClsBtnClick.bind(this);

        
        //this.ImgMouseDown = this.ImgMouseDown.bind(this);
        
        
        
        
        
    }


     componentDidMount(){
        //const url ='localhost:100/GalleryApi/Images.php';
        // axios.get(url).then(
        //     (res)=>{
        //         this.setState({images: res.data});
        //         console.log("res:",res);
        //      },
            
        //     (err)=>{
        //         console.log('Error upload data------',err.response.data);
        //     }
        // );

       

         let path1='https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzEwNC84MzAvb3JpZ2luYWwvc2h1dHRlcnN0b2NrXzExMTA1NzIxNTkuanBn';
         let path2='data:image/jpeg;base64,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';
         let path3='data:image/jpeg;base64,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';
         let path4='https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzEwNC84MzAvb3JpZ2luYWwvc2h1dHRlcnN0b2NrXzExMTA1NzIxNTkuanBn';
        
         let tmparr=[path1,path2,path3,path4];
         this.setState({images:tmparr});
        //   console.log(tmparr);

       

     }

     ImgMouseOver(e)
     {
        
        
        e.target.style.borderColor = 'green';
       
     }


     ImgMouseOut(e)
     {
        
        e.target.style.borderColor = 'black';
     }


     ImgClick(e)
     {
        
        let targetimg=e.target;
        this.setState({currentimagesrc:targetimg.src});
        this.setState({imagedisplay:"block"});
       
     }


     ClsBtnClick(e)
     {
         this.setState({imagedisplay:"none"});
     }

   

    //  ImgMouseDown(e)
    //  {
    //     console.log("Mouse down")
    //     let image=e.target;
        
    //     let coords = getCoords(image);
    //     let shiftX = e.pageX - coords.left;
    //     let shiftY = e.pageY - coords.top;
    //     image.style.position = 'absolute';
    //     document.body.appendChild(image);
    //  moveAt(e);
 
    //     function moveAt(e) {
    //         image.style.width="40rem";
    //         image.style.left = e.pageX - shiftX + 'px';
    //         image.style.top = e.pageY - shiftY + 'px';
    //         console.log(e.pageY,shiftY);

    //       }
         
    //       document.onmousemove = function(e) {
    //         moveAt(e);
    //       };
        

    //       document.onmouseup = function() {
    //         document.onmousemove = null;
    //         image.onmouseup = null;
    //         this.previmageleft=-38;
           
    //       };


    //       image.ondragstart = function() {
    //         return false;
    //       };
        
       
    //  }


    

     

     render(){
        
       
         return(
             
<div>

<button style={{display:this.state.imagedisplay}} type="button" onClick={this.ClsBtnClick} className="close" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>

                 <React.Fragment>

                     <Container  imagedisplay={this.state.imagedisplay}
                                 previmageleft={this.state.previmageleft}>
                                 <img src={this.state.currentimagesrc}></img>

                                
                     </Container>
                 
                   
                 </React.Fragment>



                 <div className="container">
 
                     <p>Hello World</p>
                     <div className="row">
                         {this.state.images.map((path, key) => <img style={{borderWidth: "0.3rem", borderColor: "black", margin: "1rem",width:"10rem", height:"10rem" }} onClick={this.ImgClick} onMouseOver={this.ImgMouseOver} onMouseOut={this.ImgMouseOut}   src={path} key={key} alt={path} className="img-thumbnail"/>)}
                     </div>

                 </div>
             </div>
         );
     }


   
    

}






function  getCoords(elem) {  
    let box = elem.getBoundingClientRect();
    let doc = window.document;
    return {
        top:doc.documentElement.scrollTop,
        left: box.left + doc.documentElement.scrollLeft
    };
  }




export default Gallery;
