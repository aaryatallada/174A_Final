import {defs, tiny} from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene, Texture,
} = tiny;

const {Cube, Axis_Arrows, Textured_Phong} = defs

//export class Assignment4 extends Scene {
//    /**
//     *  **Base_scene** is a Scene that can be added to any display canvas.
//     *  Setup the shapes, materials, camera, and lighting here.
//     */
//    constructor() {
//        // constructor(): Scenes begin by populating initial values like the Shapes and Materials they'll need.
//        super();
//
//        // TODO:  Create two cubes, including one with the default texture coordinates (from 0 to 1), and one with the modified
//        //        texture coordinates as required for cube #2.  You can either do this by modifying the cube code or by modifying
//        //        a cube instance's texture_coords after it is already created.
//        this.shapes = {
//            box_1: new Cube(),
//            box_2: new Cube(),
//            axis: new Axis_Arrows()
//        }
//        console.log(this.shapes.box_1.arrays.texture_coord)
//
//        this.shapes.box_2.arrays.texture_coord = this.shapes.box_2.arrays.texture_coord.map(x => x.times(2));
//
//        // TODO:  Create the materials required to texture both cubes with the correct images and settings.
//        //        Make each Material from the correct shader.  Phong_Shader will work initially, but when
//        //        you get to requirements 6 and 7 you will need different ones.
//        this.materials = {
//            phong: new Material(new Textured_Phong(), {
//                color: hex_color("#ffffff"),
//            }),
//            box_1: new Material(new Texture_Rotate(), {
//                color: hex_color("#000000"),
//                ambient: 1,
//                texture: new Texture("assets/stars.png", "NEAREST")
//            }),
//            box_2: new Material(new Texture_Scroll_X(), {
//                color: hex_color("#000000"),
//                ambient: 1,
//                texture: new Texture("assets/earth.gif", "LINEAR_MIPMAP_LINEAR")
//            }),
//        }
//
//        this.initial_camera_location = Mat4.look_at(vec3(0, 10, 20), vec3(0, 0, 0), vec3(0, 1, 0));
//        this.rotate = false;
//        this.box_1_t = Mat4.identity().times(Mat4.translation(-2, 0, 0, 0));
//        this.box_2_t = Mat4.identity().times(Mat4.translation(2, 0, 0, 0));
//    }
//
//    make_control_panel() {
//        // TODO:  Implement requirement #5 using a key_triggered_button that responds to the 'c' key.
//        this.key_triggered_button("Rotate", ["c"], () =>
//        this.rotate = !this.rotate);
//    }
//
//    display(context, program_state) {
//        if (!context.scratchpad.controls) {
//            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
//            // Define the global camera and projection matrices, which are stored in program_state.
//            program_state.set_camera(Mat4.translation(0, 0, -8));
//        }
//
//        program_state.projection_transform = Mat4.perspective(
//            Math.PI / 4, context.width / context.height, 1, 100);
//
//        const light_position = vec4(10, 10, 10, 1);
//        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 1000)];
//
//        let t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;
//        let model_transform = Mat4.identity();
//
//
//
//
//
//
//
//
//
//        if (this.rotate) {
//            let b1_r = Math.PI/3 * dt;
//            this.box_1_t = this.box_1_t.times(Mat4.rotation(b1_r, 1, 0, 0));
//
//            let b2_r = Math.PI/2 * dt;
//            this.box_2_t = this.box_2_t.times(Mat4.rotation(b2_r, 0, 1, 0));
//        }
//        // TODO:  Draw the required boxes. Also update their stored matrices.
//        // You can remove the folloeing line.
//        //this.shapes.axis.draw(context, program_state, model_transform, this.materials.phong.override({color: hex_color("#ffff00")}));
//        this.shapes.box_1.draw(context, program_state, this.box_1_t, this.materials.box_1);
//        this.shapes.box_2.draw(context, program_state, this.box_2_t, this.materials.box_2);
//
//
//
//
//
//    }
//}
//



export class Assignment4 extends Scene {
    constructor() {
        // constructor(): Scenes begin by populating initial values like the Shapes and Materials they'll need.
        super();
        this.cloudX = [];
        this.cloudY = [];
        this.cloudZ = [];
        this.cloudSpeed = [];
        for(let i = 0; i < 1000; i++){
            this.cloudX.push(Math.random()* (60) - 30);
            this.cloudY.push(Math.random() * (60) - 20);
            this.cloudZ.push(Math.random() * (0.8) - .3);
            this.cloudSpeed.push(Math.random() * (1) + 10)
        }
        // At the beginning of our program, load one of each of these shape definitions onto the GPU.
        this.shapes = {
            //mt: new defs.Tetrahedron(0),
            //tube: new defs.Cylindrical_Tube(15, 15, [[0, 0], [0, 1]], 10),
            waterfall: new defs.Waterfall(),
            cone: new defs.Cone_Tip(12, 12, [ [0, 1], [0, 1] ]),
            pillar: new (defs.Capped_Cylinder.prototype.make_flat_shaded_version())(10,8),
            beam: new (defs.Capped_Cylinder.prototype.make_flat_shaded_version())(10,4),
            //New shape for trunk and branch using coneTip from common.js
            trunk: new defs.Cone_Tip(3, 3,[ [0, 1], [0, 1] ]),
            branch: new defs.Cone_Tip(12, 12, [ [0, 1], [0, 1] ]),
            box_2: new Cube(),
            torus: new defs.Torus(15, 15),
            torus2: new defs.Torus(3, 15),
            sphere: new defs.Subdivision_Sphere(4),
            circle: new defs.Regular_2D_Polygon(1, 15),
            // TODO:  Fill in as many additional shape instances as needed in this key/value table.
            //        (Requirement 1)
            sun: new defs.Subdivision_Sphere(4),
            cloud: new (defs.Subdivision_Sphere.prototype.make_flat_shaded_version())(2),
            planet_2: new defs.Subdivision_Sphere(3),
            planet_3: new defs.Subdivision_Sphere(4),
            planet_4: new defs.Subdivision_Sphere(4),
            ThreeRing: new defs.Torus(50, 50),
            moon: new (defs.Subdivision_Sphere.prototype.make_flat_shaded_version())(1),
            //half :new defs.HalfTorus(10,10),

        };

        // *** Materials
        this.materials = {
            test: new Material(new defs.Phong_Shader(),
                {ambient: 1, diffusivity: .6, color: hex_color("#FFB6C1")}),
            //test2: new Material(new Gouraud_Shader(),
              //  {ambient: .4, diffusivity: .6, color: hex_color("#992828")}),
            //ring: new Material(new Ring_Shader()),
            sun: new Material(new defs.Phong_Shader(),
                {ambient: 1, diffusivity: 1, color: hex_color("#fffff")}),
            cloud:  new Material(new defs.Phong_Shader(),
                {ambient: 0, diffusivity: 1, smoothness: 2, color: hex_color("#C7C4BF", 0.68)}),
            planet_2_p:  new Material(new defs.Phong_Shader(),
                {ambient: 0, diffusivity: 0.1, color: hex_color("#fffff")}),
            //planet_2_g:  new Material(new Gouraud_Shader(),
              //  {ambient: 0, diffusivity: 0.1, color: hex_color("#fffff")}),
            planet_3:  new Material(new defs.Phong_Shader(),
                {ambient: 0, diffusivity: 1, color: hex_color("#fffff"), specularity: 1}),
           // ThreeRing: new Material(new Ring_Shader(),
             //   {ambient: 1, diffusivity: 0, color: hex_color("#fffff"), specularity: 0, smoothness: 0}),
            planet_4:  new Material(new defs.Phong_Shader(),
                {ambient: 0, diffusivity: 0, color: hex_color("#fffff"), specularity:1, smoothness: 1}),
            moon:   new Material(new defs.Phong_Shader(),
                {ambient: 0.4, diffusivity: 0, color: hex_color("#fffff"), specularity:1, smoothness: 1}),
            //new materials for trunk and branch
            trunk: new Material(new defs.Phong_Shader(),
                {ambient: 0.7, diffusivity: 1, color: hex_color("#964B00")}),
            branch: new Material(new defs.Phong_Shader(),
                {ambient: 0.7, diffusivity: 1, color: hex_color("#964B00")}),
            pillar: new Material(new defs.Phong_Shader(),
                {ambient: 0.8, diffusivity: .8, specularity: .8, color: hex_color("#ad1313")}),
            beam: new Material(new defs.Phong_Shader(),
                {ambient: 0.8, diffusivity: .8, specularity: .6, color: hex_color("#ad1313")}),
            beam2: new Material(new defs.Phong_Shader(),
                {ambient: 1, diffusivity: .9, specularity: .6, color: hex_color("#17de17")}),
            waterfall: new Material(new Texture_Scroll_X(),
                {ambient: 1, color: hex_color("#000000"), texture: new Texture("assets/earth.gif", "LINEAR_MIPMAP_LINEAR")}),
            box_2: new Material(new Texture_Scroll_X(), {
                color: hex_color("#000000"),
                ambient: 1,
                texture: new Texture("assets/earth.gif", "LINEAR_MIPMAP_LINEAR")
            }),

            // TODO:  Fill in as many additional material objects as needed in this key/value table.
            //        (Requirement 4)
        }
        this.box_2_t = Mat4.identity().times(Mat4.translation(2, 0, 0, 0));

        this.initial_camera_location = Mat4.look_at(vec3(0, 10, 20), vec3(0, 0, 0), vec3(0, 1, 0));
    }

    make_control_panel() {
        // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
        this.key_triggered_button("View solar system", ["Control", "0"], () => this.attached = () => null);
        this.new_line();
        this.key_triggered_button("Attach to planet 1", ["Control", "1"], () => this.attached = () => this.planet_1);
        this.key_triggered_button("Attach to planet 2", ["Control", "2"], () => this.attached = () => this.planet_2);
        this.new_line();
        this.key_triggered_button("Attach to planet 3", ["Control", "3"], () => this.attached = () => this.planet_3);
        this.key_triggered_button("Attach to planet 4", ["Control", "4"], () => this.attached = () => this.planet_4);
        this.new_line();
        this.key_triggered_button("Attach to moon", ["Control", "m"], () => this.attached = () => this.moon);
    }
    draw_flowers(context, program_state, model_transform, material, depth) {
        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;
        let num_branches = 10; // Number of branches to draw at each level
        let branch_angle = .5; // Angle between branches
        for (let i = 0; i < num_branches; i++) {
            let angle = i * (2 * Math.PI / num_branches); // Calculate angle for each branch
            let branch_transform = model_transform.times(Mat4.rotation(angle, 0, 1, 1)); // Rotate branch
            this.shapes.branch.draw(context, program_state, branch_transform.times(Mat4.scale(Math.sin(t/2)/2.5, Math.min(2*.5/2.5, 2*Math.sin(t/2)/2.5+.5), Math.sin(t/2)/2.5)), this.materials.test); // Scale and draw branch

            if (depth > 1) {
                let translation_matrix = Mat4.translation(0, -2, 2); // Translate to the end of the current branch
                let rotation_matrix = Mat4.rotation(branch_angle, 0, 0, 1); // Rotate branch
                this.draw_flowers(context, program_state, branch_transform.times(translation_matrix).times(rotation_matrix), material, depth - 1); // Recursively draw branches
            }
        }
    }
    mapRange(value, fromMin, fromMax, toMin, toMax) {
        // Calculate the percentage of the value within the input range
        const fromRange = fromMax - fromMin;
        const toRange = toMax - toMin;
        const scaledValue = (value - fromMin) / fromRange;

        // Map the scaled value to the output range
        const mappedValue = toMin + scaledValue * toRange;
        return mappedValue;
    }

    //DRAW FOR CHERRY BLOSSOM
    // draw_branches(context, program_state, model_transform, material, depth) {
    //     let num_branches = 3; // Number of branches to draw at each level
    //     let branch_angle = 0.5; // Angle between branches
    //     for (let i = 0; i < num_branches; i++) {
    //         let angle = i * (2 * Math.PI / num_branches); // Calculate angle for each branch
    //         let branch_transform = model_transform.times(Mat4.rotation(angle, 0, 0, 1)); // Rotate branch
    //         this.shapes.branch.draw(context, program_state, branch_transform.times(Mat4.scale(0.5, 2, 0.5)), this.materials.branch); // Scale and draw branch
            
    //         if (depth > 1) {
    //             let translation_matrix = Mat4.translation(0, 2, 0); // Translate to the end of the current branch
    //             let rotation_matrix = Mat4.rotation(branch_angle, 0, 0, 1); // Rotate branch
    //             this.draw_branches(context, program_state, branch_transform.times(translation_matrix).times(rotation_matrix), material, depth - 1); // Recursively draw branches
    //         }
    //     }
    // }



    
    display(context, program_state) {
        // display():  Called once per frame of animation.
        // Setup -- This part sets up the scene's overall camera matrix, projection matrix, and lights:
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            // Define the global camera and projection matrices, which are stored in program_state.
            program_state.set_camera(this.initial_camera_location);
        }

        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, .1, 1000);
        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;

        // TODO: Create Planets (Requirement 1)
        // this.shapes.[XXX].draw([XXX]) // <--example

        // TODO: Lighting (Requirement 2)
        const light_position = vec4(50, 50, 0, 1);

        //let sunRad = Math.sin(2 * Math.PI/7 * t); // Calculate radius based on time
        let sunCol = color(255, 216, 230, 1);
        
        // TODO:  Fill in matrix operations and drawing code to draw the solar system scene (Requirements 3 and 4)
        
        const yellow = hex_color("#fac91a");
        const gray = hex_color("#808080");
        const Swamp = hex_color("80FFFF");
        const Muddy = hex_color("#B08040");
        const Blue = hex_color("#ADD8E6");
        const Pink = hex_color("#FFB6C1")

        let model_transform = Mat4.identity().times(Mat4.rotation(-Math.PI / 1.55, 1, 0, 0)).times(Mat4.translation(13, 0, 0));  //initialize the sun to identity

        var tSun = model_transform;
        var sunR = 2 + Math.sin(2 * Math.PI/7 * t); //make the radius grow every 7 seconds
        tSun = tSun.times(Mat4.translation(40, 40, 0)); //scale in all directions by the changing radius

        // The parameters of the Light are: position, color, size, make the color the same as the sun and size 10^ radius of sun
        program_state.lights = [new Light(light_position, sunCol, 5)];

        //let model_transform = Mat4.scale([scale, scale, scale]).times(Mat4.translation([0, 0, 0]));
        var p1T = model_transform;
        p1T = p1T.times(Mat4.rotation(t, 0, 1, 0)).times(Mat4.translation(5, 0, 0));
        var p2T = model_transform;
        p2T = p2T.times(Mat4.rotation(t/2, 0, 1, 0)).times(Mat4.translation(8,0,0));
        var p3T = model_transform;
        p3T = p3T.times(Mat4.rotation(t/3, 0, 1, 0)).times(Mat4.translation(11,0,0));
        var p4T = model_transform;
        p4T = p4T.times(Mat4.rotation(t/4, 0, 1, 0)).times(Mat4.translation(14,0,0));
        var TRT = model_transform;
        var TRT = p3T.times(Mat4.scale(3, 3, 0.1));
        var MT = p4T;
        MT = MT.times(Mat4.rotation(t, 0, 1, 0)).times(Mat4.translation(2, 0, 0));
         //this.shapes.sphere.draw(context, program_state, model_transform, this.materials.test.override({color: yellow}));
        // this.shapes.f2.draw(context, program_state, model_transform, this.materials.test.override({color: red}));
        // this.shapes.s3.draw(context, program_state, model_transform, this.materials.test.override({color: red}));
        //this.shapes.ring.draw(context, program_state, model_transform, this.materials.test.override({color: sunC}));

        // this.shapes.sun.draw(context, program_state, tSun, this.materials.sun.override({color: sunCol}));
        // this.shapes.planet_1.draw(context, program_state, p1T, this.materials.planet_1.override({color: gray}));


        // if(Math.floor(t%2) == 0){
        //     this.shapes.planet_2.draw(context, program_state, p2T, this.materials.planet_2_p.override({color: Swamp}));

        // }
        // else{
        //     this.shapes.planet_2.draw(context, program_state, p2T, this.materials.planet_2_g.override({color: Swamp}));

        // }
        // this.shapes.planet_3.draw(context, program_state, p3T, this.materials.planet_3.override({color: Muddy}));
        // //this.shapes.ThreeRing.draw(context, program_state, TRT, this.materials.ThreeRing.override({color: Muddy}));
        // this.shapes.ThreeRing.draw(context, program_state, TRT, this.materials.ThreeRing.override({color: Muddy}));

        // this.shapes.planet_4.draw(context, program_state, p4T, this.materials.planet_4.override({color: Blue}));
        // this.shapes.moon.draw(context, program_state, MT, this.materials.moon.override({color: Blue}));
////////////////////////CHERRY BLOSSOM BIG AF

        // this.shapes.trunk.draw(context, program_state, model_transform.times(Mat4.scale(1, 2, 1)), this.materials.trunk); // Scale the trunk to make it longer and thicker
        //this.shapes.trunk.draw(context, program_state, model_transform.times(Mat4.scale(1, 2, 1)), this.materials.trunk); // Scale the trunk to make it longer and thicker

        this.draw_flowers(context, program_state, model_transform.times(Mat4.translation(-1, 0,4)).times(Mat4.rotation(2.2,1,0,0)), this.materials.test, 3); // Draw the branches

        // this.draw_branches(context, program_state, model_transform.times(Mat4.translation(0, 2, 0)), this.materials.branch, 5); // Draw the branches


////////////////////////TREEEE
        
// define rotation angles in radians
        const angle_z = Math.PI / 4; // Rotate around Z-axis by 45 degrees
        const angle_y = Math.PI / 4; // Rotate around Y-axis by 45 degrees

// apply the rotation transformations to the model matrices
        let model_transform1 = Mat4.rotation(angle_z, 0, 0, 1); // Rotate around Z-axis
        let model_transform2 = Mat4.rotation(angle_y, 0, 1, 0); // Rotate around Y-axis
        let model_transform3 = Mat4.rotation(angle_y, 1, -1, 0); // Rotate around Y-axis


// // draw the first cone tip  -rotated around z axis
//         this.shapes.trunk.draw(context, program_state, model_transform1.times(Mat4.translation(0,0,1)).times(Mat4.scale(1,1,5)), this.materials.trunk);

// // draw the second cone tip  -rotated around y axis
//         this.shapes.trunk.draw(context, program_state, model_transform2.times(Mat4.translation(0,0,3)).times(Mat4.scale(.5,.5,3)), this.materials.trunk);
// //draw another rotated around y axis in a different direction
//         this.shapes.trunk.draw(context, program_state, model_transform3.times(Mat4.translation(0,0,2)).times(Mat4.scale(.3,.5,2)), this.materials.trunk);

 
        


//         let model_transform1_branch1 = model_transform3
//             .times(Mat4.translation(0, 0, 2)) // Move to the end of the first branch
//             .times(Mat4.rotation(Math.PI , Math.PI/12, 0, 1)) // Rotate around Z-axis
//             .times(Mat4.scale(0.8, 0.8, 0.8)) // Scale down the branch
//             .times(Mat4.translation(1, 0, 4)); // Position the new branch at the end of the scaled branch

//         this.shapes.trunk.draw(context, program_state, model_transform1_branch1.times(Mat4.scale(0.4, 0.4, 3)), this.materials.trunk);
    
//         let model_transform1_branch2 = model_transform1
//             .times(Mat4.translation(0, 0, 5)) // Move to the end of the first branch
//             .times(Mat4.rotation(-Math.PI / 6, 0, 0, 1)) // Rotate around Z-axis in the opposite direction
//             .times(Mat4.scale(0.8, 0.8, 0.8)) // Scale down the branch
//             .times(Mat4.translation(0, 0, 2.5)); // Position the new branch at the end of the scaled branch

//        // this.shapes.trunk.draw(context, program_state, model_transform1_branch2.times(Mat4.scale(0.4, 0.4, 3)), this.materials.trunk);

// // Repeat the process for the second and third branches
// // Adjust the rotation angles and translation distances as needed for your specific tree structure

// // For a branch extending from the second secondary branch
//         let model_transform2_branch1 = model_transform2
//             .times(Mat4.translation(0, 0, 3)) // Move to the end of the second branch
//             .times(Mat4.rotation(Math.PI / 6, 0, 1, 0)) // Rotate around Y-axis
//             .times(Mat4.scale(0.7, 0.7, 0.7)) // Scale down the branch
//             .times(Mat4.translation(0, 0, 1.5)); // Position the new branch at the end of the scaled branch

//         this.shapes.trunk.draw(context, program_state, model_transform2_branch1.times(Mat4.scale(0.3, 0.3, 2)), this.materials.trunk);

//         let model_transform2_branch2 = model_transform2
//             .times(Mat4.translation(0, 0, 3)) // Move to the end of the second branch
//             .times(Mat4.rotation(-Math.PI / 6, 0, 1, 0)) // Rotate around Y-axis in the opposite direction
//             .times(Mat4.scale(0.7, 0.7, 0.7)) // Scale down the branch
//             .times(Mat4.translation(0, 0, 1.5)); // Position the new branch at the end of the scaled branch

//         this.shapes.trunk.draw(context, program_state, model_transform2_branch2.times(Mat4.scale(0.3, 0.3, 2)), this.materials.trunk);

        const angle_90 = Math.PI / 3; // Rotate around x-axis by 90 degrees
        const angle_test = Math.PI / 60;
        const angle_test2 = Math.PI / 2;

        let shrine_transform = Mat4.identity().times(Mat4.translation(0,-1,0)).times(Mat4.scale(0.5,0.5,0.5));
        let shrine_pillar1 = shrine_transform.times(Mat4.rotation(angle_90, 10, 0, 0)).times(Mat4.translation(8, -3, 4));
        let shrine_pillar2 = shrine_transform.times(Mat4.rotation(angle_90, 10, 0, 0)).times(Mat4.translation(-8, -3, 4));
        // Rotate around Y-axis
        this.shapes.pillar.draw(context,program_state, shrine_pillar1.times(Mat4.rotation(angle_test, 0, 1, 0)).times(Mat4.scale(.7,.5,22)), this.materials.pillar);
        this.shapes.pillar.draw(context,program_state, shrine_pillar2.times(Mat4.rotation(-angle_test, 0, 1, 0)).times(Mat4.scale(.7,.5,22)), this.materials.pillar);




        let shrine_beam = shrine_transform.times(Mat4.rotation(angle_90, 10, 0, 0)).times(Mat4.rotation(angle_test2, 0, 10, 0)).times(Mat4.translation(2.2, -3,  0));
        this.shapes.beam.draw(context,program_state, shrine_beam.times(Mat4.scale(.6,.5,25)),this.materials.beam);

        // Define the original transformation for shrine_beam2
        let shrine_beam2 = shrine_transform.times(Mat4.rotation(angle_90, 10, 0, 0)).times(Mat4.rotation(angle_test2, 0, 10, 0)).times(Mat4.translation(6.5, -3,  0));

        let shrine_top = shrine_transform.times(Mat4.translation(0, 4.2, -6))
            .times(Mat4.scale(13,0.5,1))
        ;
        let shrine_top3 = shrine_transform.times(Mat4.translation(0, 4.52, -6))
            .times(Mat4.scale(13,0.5,1))
        ;
        let shrine_top4 = shrine_transform.times(Mat4.translation(0, 4.63, -6))
            .times(Mat4.scale(13,0.5,1))
        ;
        let shrine_top2 = shrine_transform.times(Mat4.translation(0, 4.7, -6))
            .times(Mat4.scale(10.5,0.5,1))
        ;

        let test1 = shrine_beam.times(Mat4.translation(0, 4.7, 0))
            .times(Mat4.scale(10.5,1,10))
        this.shapes.torus.draw(context,program_state, shrine_top,this.materials.beam);
        this.shapes.torus.draw(context,program_state, shrine_top3,this.materials.beam);
        this.shapes.torus.draw(context,program_state, shrine_top4,this.materials.beam);

        //this.shapes.half.draw(context,program_state, test1,this.materials.beam2);



        // Draw the trunk
        this.shapes.trunk.draw(context, program_state, model_transform.times(Mat4.scale(1, 1, 12)), this.materials.trunk);
        let cloud_transform = model_transform.times(Mat4.translation(Math.sin((t / 4)),0,-10)).times(Mat4.scale(2, 2, 2));
        //this.shapes.cloud.draw(context, program_state, cloud_transform, this.materials.cloud);

        for(let i = 0; i < 1000; i++){
            if(i % 2 == 0){
                cloud_transform = cloud_transform.times(Mat4.translation(this.cloudX[i],this.cloudY[i],this.cloudZ[i])).times(Mat4.scale(3, 2, 2));
            }else{
                cloud_transform = cloud_transform.times(Mat4.translation(this.cloudX[i],this.cloudY[i],this.cloudZ[i])).times(Mat4.scale(2, 2, 2));
            }
            let final_cloud = cloud_transform.times(Mat4.translation((11/this.cloudSpeed[i])*Math.sin((t / this.cloudSpeed[i])), 0, 0));
            if(this.cloudY[i] > 10) {
                this.shapes.cloud.draw(context, program_state, final_cloud, this.materials.cloud.override({color: hex_color("#C7C4BF", this.mapRange(this.cloudY[i], 10, 40, 0.68, 0.1))}));
            }else{
                this.shapes.cloud.draw(context, program_state, final_cloud, this.materials.cloud);
            }
            cloud_transform = model_transform.times(Mat4.translation(0,0,-10)).times(Mat4.scale(2, 2, 2));

        }
        //this.shapes.cloud.draw(context, program_state, cloud_transform.times(Mat4.translation(4, 0, 0)), this.materials.cloud);
        //this.shapes.cloud.draw(context, program_state, cloud_transform.times(Mat4.translation(3, -2, 3)), this.materials.cloud);



        // Draw branches
        for (let i = 0; i < 5; i++) {
            const angle = (i * Math.PI / 6) - Math.PI / 2; // Distribute branches evenly around trunk
            const base_angle = (4 * Math.PI / 6) - Math.PI / 2;
            const branch_transform = model_transform.times(Mat4.rotation(angle, 0, 1, 0))
                                                     .times(Mat4.translation(0, 0, 4))
                                                     .times(Mat4.scale(0.5, 0.5, 4));
            this.shapes.branch.draw(context, program_state, branch_transform, this.materials.branch);

    // Add small branch to the middle of each branch at a different angle
            const small_branch_angle = base_angle + Math.PI / 4; // Adjust angle as needed
            const small_branch_transform = branch_transform.times(Mat4.rotation(small_branch_angle, 0, 1, 0))
                                                           .times(Mat4.translation(0, 0, 2))
                                                           .times(Mat4.scale(0.25, 0.25, 2)); // Adjust scaling factor
            this.shapes.branch.draw(context, program_state, small_branch_transform, this.materials.branch);

    // Add even smaller branch to the middle of each second branch at a different angle
            const smaller_branch_angle = base_angle - Math.PI / 6; // Adjust angle as needed
            const smaller_branch_transform = small_branch_transform.times(Mat4.rotation(smaller_branch_angle/2, 0, 1, 0))
                                                                 .times(Mat4.translation(0, 0, 1))
                                                                 .times(Mat4.scale(0.15, 0.15, .5)); // Adjust scaling factor
            this.shapes.branch.draw(context, program_state, smaller_branch_transform, this.materials.branch);
        }

        const cylinder_transform = model_transform.times(Mat4.translation(0, 0, -6.4)).times(Mat4.scale(1, 1, 3)); // Adjust translation and scaling as needed
        //this.shapes.tube.draw(context, program_state, cylinder_transform, this.materials.trunk);

        
        ////////////////waterfall?
        let cliff_t = Mat4.identity();

// Apply translation to move the sphere to the desired position
        cliff_t = cliff_t.times(Mat4.translation(-5, -10, -15)).times(Mat4.rotation(Math.PI/2, 0, 1, 0)); // Move the sphere back along the z-axis

// Apply scaling to stretch the sphere vertically
        cliff_t = cliff_t.times(Mat4.scale(5, 15, 50)); // Scale the sphere vertically by 1.5
    
// Draw the subdivision sphere with the updated model transformation
        this.shapes.sphere.draw(context, program_state, cliff_t, this.materials.trunk.override({color: gray}));




        let waterfall_t = Mat4.identity();

// Apply translation to move the waterfall to the desired position
        waterfall_t = waterfall_t.times(Mat4.translation(-10, -8.7, 8.5)); // Move the waterfall to the front of the cliff
        const tilt_angle = Math.PI / 4; // Adjust the tilt angle as needed
        waterfall_t = waterfall_t.times(Mat4.rotation(tilt_angle, -1, 0, 0));
// Apply scaling to adjust the size of the waterfall
// You can adjust these values according to the desired size of the waterfall
        waterfall_t = waterfall_t.times(Mat4.scale(10, 20, 10));

// Draw the waterfall with the updated model transformation
        this.shapes.waterfall.draw(context, program_state, waterfall_t, this.materials.waterfall);
        // Apply translation to move the waterfall to the desired position
        let waterfall_t2 = Mat4.identity().times(Mat4.translation(0, 1, 0)); // Move the waterfall to the front of the cliff
        waterfall_t2 = waterfall_t2.times(Mat4.translation(-10, 0, -15)); // Move the waterfall to the front of the cliff
        waterfall_t2 = waterfall_t2.times(Mat4.rotation(tilt_angle, -1, 0, 0));
// Apply scaling to adjust the size of the waterfall
// You can adjust these values according to the desired size of the waterfall
        waterfall_t2 = waterfall_t2.times(Mat4.scale(10, 20, 10));
        const tilt_angle2 = Math.PI / 4.5; // Adjust the tilt angle as needed
        waterfall_t2 = waterfall_t2.times(Mat4.rotation(tilt_angle2*2.5, 1, 0, 0));
// Apply scaling to adjust the size of the waterfall
// You can adjust these values according to the desired size of the waterfall
        waterfall_t2 = waterfall_t2.times(Mat4.scale(1, 1, 1));
        this.shapes.waterfall.draw(context, program_state, waterfall_t2, this.materials.waterfall);

        this.shapes.box_2.draw(context, program_state, this.box_2_t, this.materials.box_2);

        
        
        this.planet_1 = Mat4.inverse(p1T.times(Mat4.translation(0, 0, 3)));
        this.planet_2 = Mat4.inverse(p2T.times(Mat4.translation(0, 0, 3)));
        this.planet_3 = Mat4.inverse(p3T.times(Mat4.translation(0, 0, 3)));
        this.planet_4 = Mat4.inverse(p4T.times(Mat4.translation(0, 0, 3)));
        this.moon = Mat4.inverse(MT.times(Mat4.translation(0, 0, 3)));

        if (this.attached === undefined) {}
        else{
            program_state.camera_inverse = this.attached().map((x,i) => Vector.from(program_state.camera_inverse[i]).mix(x, 0.1));
        }

    }
}















class Texture_Scroll_X extends Textured_Phong {
    // TODO:  Modify the shader below (right now it's just the same fragment shader as Textured_Phong) for requirement #6.
    fragment_glsl_code() {
        return this.shared_glsl_code() + `
            varying vec2 f_tex_coord;
            uniform sampler2D texture;
            uniform float animation_time;
            
            void main(){
                float slide_trans = mod(animation_time, 4.) * 2.; 
                mat4 slide_matrix = mat4(vec4(-1., 0., 0., 0.), 
                                   vec4( 0., 1., 0., 0.), 
                                   vec4( 0., 0., 1., 0.), 
                                   vec4(slide_trans, 0., 0., 1.)); 

                vec4 new_tex_coord = vec4(f_tex_coord, 0, 0) + vec4(1., 1., 0., 1.); 
                new_tex_coord = slide_matrix * new_tex_coord; 

                vec4 tex_color = texture2D(texture, new_tex_coord.xy);

                // Add outline of a black square in the center of 
                // each texture that moves with the texture

                // Black out wrt the new tex coord
                 float u = mod(new_tex_coord.x, 1.0);
                 float v = mod(new_tex_coord.y, 1.0);

                // float distance_to_center = sqrt(pow(u - 0.5, 2.0) + pow(v - 0.5, 2.0));
                //   if (distance_to_center > 0.3 && distance_to_center < 0.4) {
                //     tex_color = vec4(0, 0, 0, 1.0);
                // }
                
                // inside edge length: 0.5 --> (0.75 - 0.25)
                // outside edge length: 0.7 --> (0.85 - 0.15)
                
                // left edge
                 if (u > 0.15 && u < 0.25 && v > 0.15 && v < 0.85) {
                     tex_color = vec4(0, 0, 0, 1.0);
                 }
                // right edge
                 if (u > 0.75 && u < 0.85 && v > 0.15 && v < 0.85) {
                     tex_color = vec4(0, 0, 0, 1.0);
                 }
                // bottom edge
                 if (v > 0.15 && v < 0.25 && u > 0.15 && u < 0.85) {
                     tex_color = vec4(0, 0, 0, 1.0);
                 }
                // top edge
                 if (v > 0.75 && v < 0.85 && u > 0.15 && u < 0.85) {
                     tex_color = vec4(0, 0, 0, 1.0);
                 }

                if( tex_color.w < .01 ) discard;
                                                                         // Compute an initial (ambient) color:
                gl_FragColor = vec4( ( tex_color.xyz + shape_color.xyz ) * ambient, shape_color.w * tex_color.w ); 
                                                                         // Compute the final color with contributions from lights:
                gl_FragColor.xyz += phong_model_lights( normalize( N ), vertex_worldspace );
        } `;
    }
}


class Texture_Rotate extends Textured_Phong {
    // TODO:  Modify the shader below (right now it's just the same fragment shader as Textured_Phong) for requirement #7.
    fragment_glsl_code() {
        return this.shared_glsl_code() + 
      `
            varying vec2 f_tex_coord;
            uniform sampler2D texture;
            uniform float animation_time;
            void main(){
                // Sample the texture image in the correct place:
                float theta = 3.14159265 * 0.5 * mod(animation_time, 4.0); 
                mat4 matrix = mat4(vec4(cos(theta), sin(theta), 0, 0), vec4(sin(theta), -cos(theta), 0, 0), vec4( 0, 0, 1, 0), vec4( 0, 0, 0, 1));
                vec4 new_tex_coord = vec4(f_tex_coord, 0, 0) + vec4(-0.5, -0.5, 0, 0);
                new_tex_coord = (matrix * new_tex_coord) + vec4(0.5, 0.5, 0, 0);       
                vec4 tex_color = texture2D(texture, new_tex_coord.xy);
                
                 float u = mod(new_tex_coord.x, 1.0);
                 float v = mod(new_tex_coord.y, 1.0);
                
                // Edges
                if (u > 0.75 && u < 0.85 && v > 0.15 && v < 0.85) {
                    tex_color = vec4(0, 0, 0, 1);
                }
                if (v > 0.75 && v < 0.85 && u > 0.15 && u < 0.85) {
                    tex_color = vec4(0, 0, 0, 1);
                }
                if (u > 0.15 && u < 0.25 && v > 0.15 && v < 0.85) {
                    tex_color = vec4(0, 0, 0, 1);
                }
                if (v > 0.15 && v < 0.25 && u > 0.15 && u < 0.85) {
                    tex_color = vec4(0, 0, 0, 1);
                }
                if( tex_color.w < 0.01 ) discard;

                // Compute an initial (ambient) color:
                gl_FragColor = vec4( ( tex_color.xyz + shape_color.xyz ) * ambient, shape_color.w * tex_color.w ); 

                // Compute the final color with contributions from lights:
                gl_FragColor.xyz += phong_model_lights( normalize( N ), vertex_worldspace );
        } `;
    }
}

