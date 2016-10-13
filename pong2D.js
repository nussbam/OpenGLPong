/**
 * Created by Marc Nussbaumer (nussbam) on 7.10.2016.
 */

/**
 * Defines which method should be called when the window loads.
 * @type {startup}
 */
window.onload = startup;

var canvas;
var gl;
var aVertexPositionID;
var buffer;
var colorBuffer;
var combinedBuffer;
var shaderProgram;
var uColorPositionId ;

/**
 * Connects the shader-variables with javascript.
 */
function setupAttributes(){
    aVertexPositionID = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    uColorPositionId =  gl.getAttribLocation(shaderProgram , "aColor") ;

}

/**
 * Fills the buffer with values to draw two squares.
 * Allowed vertices-values are in the default grid between -1 and 1.
 */
function setupBuffers(){
    buffer = gl.createBuffer();

    var vertices = [
        //First square positioned top right
        0,0,
        0.5,0,
        0,0.5,
        0.5,0.5,

        //Second square positioned bottom left
        -0.5,-0.5,
        0, -0.5,
        -0.5,-1,
        0, -1

    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

/**
 * Seperate buffer for just colors
 */
function setupBufferColor(){
    colorBuffer = gl.createBuffer();

    var vertices = [
        1,1,1,1,
        0.5,0.5,0.5,1,
        0,0.5,0.5,1,
        1,1,1,1,


        0.5,0.5,0.5,1,
        0.2, 0.2, 0.2, 0.2,
        0.4,0.2,0.2,0.4,
        0.2, 0.3,0.3,0.3

    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

function setupCombinedBuffer(){
    combinedBuffer = gl.createBuffer();
    var points = [-0.5,0.5];


    var vertices = [
        /*0,0,1,1,1,1,
        0.5,0,0.5,0.5,0.5,1,
        0,0.5,0,0.5,0.5,1,
        0.5,0.5,1,1,1,1,*/

        0,0, Math.random(),Math.random(),Math.random(),Math.random(),
        0.5,0, Math.random(),Math.random(),Math.random(),Math.random(),
        0,0.5, Math.random(),Math.random(),Math.random(),Math.random(),
        0.5,0.5, Math.random(),Math.random(),Math.random(),Math.random(),

        -0.5,-0.5, Math.random(),Math.random(),Math.random(),Math.random(),
        0,-0.5, Math.random(),Math.random(),Math.random(),Math.random(),
        -0.5,-1, Math.random(),Math.random(),Math.random(),Math.random(),
        0,-1, Math.random(),Math.random(),Math.random(),Math.random()

        /*-0.5,-0.5,0.5,0.5,0.5,1,
        0,-0.5,0.2, 0.2, 0.2, 0.2,
        -0.5,-1,0.4,0.2,0.2,0.4,
        0,-1,0.2, 0.3,0.3,0.3
        */
    ];




    gl.bindBuffer(gl.ARRAY_BUFFER, combinedBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}


function startup(){
    canvas = document.getElementById("gameCanvas");
    gl = createGLContext(canvas);
    initGL();
    drawAnimated(Date.now());
}

function createGLContext(canvas){
    var context = canvas.getContext("webgl");
    if(!context){
        alert("Failed to create GL context");
    }
    return context;
}

function initGL(){
    gl.clearColor(1,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    shaderProgram = loadAndCompileShaders(gl,"VertexShader.shader","FragmentShader.shader");
    setupAttributes();
    setupBuffers();
    setupBufferColor();
    setupCombinedBuffer();
}

function drawAnimated(timeStamp){

    setupCombinedBuffer();
    draw();
    window.requestAnimationFrame(drawAnimated);
}

function draw(){

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(aVertexPositionID, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aVertexPositionID);

    /*gl.bindBuffer(gl.ARRAY_BUFFER, combinedBuffer);
    gl.vertexAttribPointer(uColorPositionId, 4, gl.FLOAT, false, 24, 8);
    gl.enableVertexAttribArray(uColorPositionId);*/


    //gl.uniform4f(uColorPositionId, 1.0, 1.0, 0.0, 1.0) ;
    //gl.drawArrays(gl.TRIANGLE_STRIP, 0, 100);
    //gl.uniform4f(uColorPositionId, 0.0, 0.0, 0.0, 1.0) ;
    gl.drawArrays(gl.TRIANGLE_STRIP, 4, 4);
}