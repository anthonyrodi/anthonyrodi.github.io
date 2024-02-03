//
//CSE 470 HW 1 TWISTY!  
//
/*
Written by: HW470:YOUR NAME HERE
Date: Jan 2021

Description: 
This program ..... HW470: COMPLETE THIS. DESCRIBE WHAT YOU DID.
*/

var canvas;
var gl;

//store the vertices
//Each triplet represents one triangle
var vertices = [];

//store a color for each vertex
var colors = [];

//HW470: control the rotation
//(Your variable here)
 

//HW470: control the redraw rate
//var delay = 20;
var delay = 1;
var theta = 0.0;
var thetaLoc;
var direction = true;
var deltaRadians = (2*3.149)/(8*60);
var speedIncrement = deltaRadians/2.0;
const radians2degrees = 90.0/3.14159;

// =============== function init ======================
 
// When the page is loaded into the browser, start webgl stuff
window.onload = function init()
{
	// notice that gl-canvas is specified in the html code
    canvas = document.getElementById( "gl-canvas" );
    
	// gl is a canvas object
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	// Track progress of the program with print statement
    console.log("Opened canvas");
        
    //HW470:
    // Define  data for object 
	// See HW specs for number of vertices  required
	//here are the scaling factors between each hexagon
    //vertices were calculated by using unit circle identities to generate six distinct vertices for each hexagon
    var factor = 0.5;
    var factor1 = 0.55;
    var vertices = [
        vec2(0,0),
        vec2(1,0),
        vec2(0.5,Math.sqrt(3)/2),
        vec2(0,0),
        vec2(0.5,Math.sqrt(3)/2),
        vec2(-0.5,Math.sqrt(3)/2),
        vec2(0,0),
        vec2(-1,0),
        vec2(-0.5,Math.sqrt(3)/2),
        vec2(0,0),
        vec2(-0.5,Math.sqrt(3)/-2),
        vec2(-1,0),
        vec2(0,0),
        vec2(-0.5,Math.sqrt(3)/-2),
        vec2(0.5,Math.sqrt(3)/-2),
        vec2(0,0),
        vec2(1,0),
        vec2(0.5,Math.sqrt(3)/-2),


        vec2(0,0),
        vec2(factor1*1,0),
        vec2(factor1*0.5,factor1*Math.sqrt(3)/2),
        vec2(0,0),
        vec2(factor1*0.5,factor1*Math.sqrt(3)/2),
        vec2(factor1*-0.5,factor1*Math.sqrt(3)/2),
        vec2(0,0),
        vec2(factor1*-1,0),
        vec2(factor1*-0.5,factor1*Math.sqrt(3)/2),
        vec2(0,0),
        vec2(factor1*-0.5,factor1*Math.sqrt(3)/-2),
        vec2(factor1*-1,0),
        vec2(0,0),
        vec2(factor1*-0.5,factor1*Math.sqrt(3)/-2),
        vec2(factor1*0.5,factor1*Math.sqrt(3)/-2),
        vec2(0,0),
        vec2(factor1*1,0),
        vec2(factor1*0.5,factor1*Math.sqrt(3)/-2),



        vec2(0,0),
        vec2(factor*1,0),
        vec2(factor*0.5,factor*Math.sqrt(3)/2),
        vec2(0,0),
        vec2(factor*0.5,factor*Math.sqrt(3)/2),
        vec2(factor*-0.5,factor*Math.sqrt(3)/2),
        vec2(0,0),
        vec2(factor*-1,0),
        vec2(factor*-0.5,factor*Math.sqrt(3)/2),
        vec2(0,0),
        vec2(factor*-0.5,factor*Math.sqrt(3)/-2),
        vec2(factor*-1,0),
        vec2(0,0),
        vec2(factor*-0.5,factor*Math.sqrt(3)/-2),
        vec2(factor*0.5,factor*Math.sqrt(3)/-2),
        vec2(0,0),
        vec2(factor*1,0),
        vec2(factor*0.5,factor*Math.sqrt(3)/-2),

    ]; //54 vertices
	

    



	//HW470: Create colors for the core and outer parts
	// See HW specs for the number of colors needed
    var colorr = vec3(0.0, 0.0, 0.0); //instantiating another color variable
    console.log(vertices.length);
    var count = 0; //count to keep track of each triangle
    var rval = 0.0, gval = 0.0, bval = 0.0;

    var first = true; //first variable to reset color value when a new region is reached
	for(var i=0; i < vertices.length; i++) {
        //var rval = 0.0, gval = 0.0, bval = 0.0;
        if(i % 3 == 0) {    //for every 3 vertex pairs, (every triangle)
            count++;
            if (count > 12) {   //innermost hexagon, different shades of blue to create a gradient
                if(first) {
                    rval = 1.0;
                    bval = 1.0;
                    gval = 1.0;
                    first = false;
                }
                rval += -0.17;  //subtracting from additive model makes it fade from white to blue
                gval += -0.17;
            }
            else if (count > 6) {   //middle hexagon, all 6 triangles are white to make a gap.
                rval = 1.0;
                bval = 1.0;
                gval = 1.0;
                first = true;
            }
            else if(count > 4) {    //outer two yellow triangles, adding in blue to make lighter yellow
                if(first) {
                    rval = 1.0;
                    bval = 0.0;
                    gval = 1.0;
                    first = false;
                }
                //rval += 1.0;
                bval += 0.2;
                //gval += 1.0;
                
            }
            else if(count > 2) {    //outer two green triangles
                gval += 0.5;    
                rval = 0.0;
                bval = 0.0;
            }
            else {  //outer two red triangles
                rval += 0.5;
                gval = 0.0;
                bval = 0.0;
            }
            
            
            colorr = vec3(rval, gval, bval);
        }
		colors.push(colorr);
	};
	 
	 
	
	
	// HW470: Print the input vertices and colors to the console
	console.log("Input vertices and colors:");
	 
	 

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
	// Background color to white
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Define shaders to use  
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU
	//
	// color buffer: create, bind, and load
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
	
	// Associate shader variable for  r,g,b color
	var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
    
    // vertex buffer: create, bind, load
    var vbuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vbuffer );
    //gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices[0,18]), gl.STATIC_DRAW );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate shader variables for x,y vertices	
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	//HW470: associate shader explode variable ("Loc" variables defined here) 
    thetaLoc = gl.getUniformLocation( program, "theta" );   //passing theta to the vertex shader

    
    

    console.log("Data loaded to GPU -- Now call render");
    console.log("vertices = ",vertices);

    render();
};


// =============== function render ======================

function render()
{
    // clear the screen 
    gl.clear( gl.COLOR_BUFFER_BIT );
	
	//HW470: send uniform(s) to vertex shader
    gl.drawArrays( gl.TRIANGLES, 0, 58 );
	theta += (direction ? deltaRadians : -deltaRadians);
    //console.log(theta);
    if(theta > 3.149) { //it will oscillate between [0,pi), thus have 180 degree rotation both ways
        direction = false;
        delay = 10;
    }
    if(theta < 0.0) {
        direction = true;
        delay = 1000;
    }

    gl.uniform1f(thetaLoc, theta);  //passing theta to thetaLoc in vertex shader as it updates.

    



	//re-render after delay
    //requestAnimFrame(render);
	setTimeout(function (){requestAnimFrame(render);}, delay);
    delay = 1;
}

