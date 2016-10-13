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
var karthBuffer;
var playerLeftBuffer;
var playerRightBuffer;
var middleLineBuffer;
var ballBuffer;
var colorBuffer;
var combinedBuffer;
var shaderProgram;
var uColorPositionId ;
var uModelViewMatrix;
var orthoMatrix;

/**
 * Connects the shader-variables with javascript.
 */
function setupAttributes(){
    aVertexPositionID = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    uColorPositionId =  gl.getAttribLocation(shaderProgram , "aColor") ;
    uModelViewMatrix = gl.getUniformLocation(shaderProgram,"uModelViewMatrix");
}



function setupLeftBuffer(){

    playerLeftBuffer = gl.createBuffer();

    var vertices = [
        //First square positioned top right
        0,0,
        15,0,
        0,70,
        15,70,
        0,0,

        //Second square positioned bottom left


    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, playerLeftBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

function setupRightBuffer(){

    playerRightBuffer = gl.createBuffer();

    var vertices = [
        //First square positioned top right
        0,0,
        15,0,
        0,70,
        15,70,
        0,0,

        //Second square positioned bottom left


    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, playerRightBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

function setupMiddleLineBuffer(){

    middleLineBuffer = gl.createBuffer();

    var vertices = [
        //First square positioned top right
        398,0,
        402,0,
        398,800,
        402,800,
        398,0,

        //Second square positioned bottom left


    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, middleLineBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

function setupBallBuffer(){

    ballBuffer = gl.createBuffer();

    var vertices = [
        //First square positioned top right
        0,0,
        15,0,
        0,15,
        15,15,
        0,0,

        //Second square positioned bottom left


    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, ballBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

/**
 * Fills the buffer with values to draw two squares.
 * Allowed vertices-values are in the default grid between -1 and 1.
 */
function setupKarthBuffers(){
    karthBuffer = gl.createBuffer();

    var vertices = [
        //First square positioned top right
        0,0,
        20,0,
        0,20,
        20,20,
        0,0,

        //Second square positioned bottom left


    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, karthBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
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
        0,0,

        //Second square positioned bottom left

        0,0,
        -0.5,-0,
        0, -0.5,
        -0.5,-0.5,
        0, 0

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
    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    shaderProgram = loadAndCompileShaders(gl,"VertexShader.shader","FragmentShader.shader");
    setupAttributes();
    setupRightBuffer();
    setupLeftBuffer();
    setupMiddleLineBuffer();
    setupBallBuffer();
    orthoMatrix = mat4.create();
    mat4.ortho(orthoMatrix,0,800,0,600,1,0);


    /*setupBuffers();
    setupBufferColor();
    setupCombinedBuffer();
    setupKarthBuffers();*/
}

function drawAnimated(timeStamp){

    setupCombinedBuffer();
    draw();
    window.requestAnimationFrame(drawAnimated);
}

function draw(){
    var temp = mat4.create();
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, middleLineBuffer);
    gl.vertexAttribPointer(aVertexPositionID, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aVertexPositionID);
    mat4.translate(temp,orthoMatrix,[0,0,0]);
    gl.uniformMatrix4fv(uModelViewMatrix,false,temp);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    gl.bindBuffer(gl.ARRAY_BUFFER, playerLeftBuffer);
    gl.vertexAttribPointer(aVertexPositionID, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aVertexPositionID);
    mat4.translate(temp,orthoMatrix,[15,150,0]);
    gl.uniformMatrix4fv(uModelViewMatrix,false,temp);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    gl.bindBuffer(gl.ARRAY_BUFFER, playerRightBuffer);
    gl.vertexAttribPointer(aVertexPositionID, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aVertexPositionID);
    mat4.translate(temp,orthoMatrix,[770,350,0]);
    gl.uniformMatrix4fv(uModelViewMatrix,false,temp);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    gl.bindBuffer(gl.ARRAY_BUFFER, ballBuffer);
    gl.vertexAttribPointer(aVertexPositionID, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aVertexPositionID);
    mat4.translate(temp,orthoMatrix,[0,0,0]);
    gl.uniformMatrix4fv(uModelViewMatrix,false,temp);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);





    /*gl.bindBuffer(gl.ARRAY_BUFFER, combinedBuffer);
    gl.vertexAttribPointer(uColorPositionId, 4, gl.FLOAT, false, 24, 8);
    gl.enableVertexAttribArray(uColorPositionId);*/


    //gl.uniform4f(uColorPositionId, 1.0, 1.0, 0.0, 1.0) ;
    //gl.drawArrays(gl.TRIANGLE_STRIP, 0, 100);
    //gl.uniform4f(uColorPositionId, 0.0, 0.0, 0.0, 1.0) ;
    //gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}