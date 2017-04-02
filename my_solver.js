//alert('operational');

// Create a new solved cube instance 
var cube = new Cube();

// This takes 4-5 seconds on a modern computer
Cube.initSolver();

// Apply an algorithm or randomize the cube state 
cube.move("U F R2 B' D2 L'");
cube.randomize();
setTimeout(displayCube(cube),500);
var solveAlg = cube.solve() /* => "D2 B' R' B L' B ..." */
doAlg(solveAlg);
displayCube(cube);



function doAlg(alg) {
    cube.move(alg); // These typically take from 0.01s to 0.4s, rarely up to 2s 
    console.log('executing alg:\n' + alg);
    var moves = alg.split(' ');
    for (var i = 0; i < moves.length; i++) {
        var move = moves[i].split('');
        if(move.length == 1) {
            turnMotor(move[0],true);
        }
        else if (move[1] == '\'') {
            turnMotor(move[0],false);
        }
        else if (move[1] == '2') {
            turnMotor(move[0],true);
            turnMotor(move[0],true);
        }
    }
}

function turnMotor(face,direction /*true for clockwise, false for anti-clockwise*/) {
    var d = direction?'clockwise':'anti-clockwise';
    console.log('moving ' + face + ' ' + d + '...');
}


function displayCube(cube_in, id_in) {
    if (id_in == undefined) {
        id_in = 'disp';
    }
    var cube_string = cube.asString();
    //console.log(cube_string);
    /*var arrays = [],
        size = 3;
    var a = cube_string.split('');
    while (a.length > 0) {
        arrays.push(a.splice(0, size).join(' | '));
    }
    document.getElementById(id_in).innerHTML = document.getElementById(id_in).innerHTML + arrays.join('<br>') + '<br><br>';
    console.log(document.getElementById(id_in).innerHTML + arrays.join('\n'));*/
    var disp_template = '             +------------+\n             | U1  U2  U3 |\n             |            |\n             | U4  U5  U6 |\n             |            |\n             | U7  U8  U9 |\n+------------+------------+------------+------------+\n| L1  L2  L3 | F1  F2  F3 | R1  R2  R3 | B1  B2  B3 |\n|            |            |            |            |\n| L4  L5  L6 | F4  F5  F6 | R4  R5  R6 | B4  B5  B6 |\n|            |            |            |            |\n| L7  L8  L9 | F7  F8  F9 | R7  R8  R9 | B7  B8  B9 |\n+------------+------------+------------+------------+\n             | D1  D2  D3 |\n             |            |\n             | D4  D5  D6 |\n             |            |\n             | D7  D8  D9 |\n             +------------+\n';
    var arrays = [],
        size = 9;
    var a = cube_string.split('');
    while (a.length > 0) {
        arrays.push(a.splice(0, size));
    }
    var disp_faces = ['U', 'D', 'F', 'B', 'L', 'R'];
    for (var i = 0; i < 6; i++) {
        for (var l = 1; l <= 9; l++) {
            disp_template = disp_template.replace(disp_faces[i] + '' + l, ' ' + arrays[i][l - 1] + '');
        }

    }
    console.log(disp_template)
}