let scene = new THREE.Scene();

let RATIO_WIDTH_HEIGHT = 0.9;

let camera = new THREE.PerspectiveCamera(75, (window.innerWidth*RATIO_WIDTH_HEIGHT)  / (window.innerHeight*RATIO_WIDTH_HEIGHT), 0.1, 1000);

camera.position.z = 5;

let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor('#e5e5e5');
renderer.setSize((window.innerWidth*RATIO_WIDTH_HEIGHT),(window.innerHeight*RATIO_WIDTH_HEIGHT));

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize((window.innerWidth*RATIO_WIDTH_HEIGHT),(window.innerHeight*RATIO_WIDTH_HEIGHT));
    camera.aspect = (window.innerWidth*RATIO_WIDTH_HEIGHT) / (window.innerHeight*RATIO_WIDTH_HEIGHT);

    camera.updateProjectionMatrix();
});

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

let geometry = new THREE.BoxGeometry(1,1,1);
let material = new THREE.MeshLambertMaterial({color:0xe0bea2});

let mesh;

for (let i = 0; i < 1; i++) {
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}

let light = new THREE.PointLight(0xFFFFFF,1,1000);
light.position.set(0,0,0);

scene.add(light);

let light2 = new THREE.PointLight(0xFFFFFF,2,1000);
light2.position.set(0,0,25);

scene.add(light2);

let increase = false;

let render = () => {
    requestAnimationFrame(render);

    for (let i = 0; i < scene.children.length; i++) {
        const element = scene.children[i];
        
        element.rotation.x += 0.05;
        element.rotation.y += 0.01;
        
    }

    renderer.render(scene, camera);
};

function onMouseMove(event) {

    event.preventDefault();
    mouse.x = ( event.offsetX / (window.innerWidth*RATIO_WIDTH_HEIGHT) ) * 2 - 1;
    mouse.y = - ( event.offsetY / (window.innerHeight*RATIO_WIDTH_HEIGHT) ) * 2 + 1;

    raycaster.setFromCamera(mouse,camera);
    let intersects = raycaster.intersectObjects(scene.children, true);

    for(let i=0;i<intersects.length;i++) {
        let tl = new TimelineMax();   
        tl.to(intersects[i].object.position, .5, {x:2, ease: Expo.easeOut});
        tl.to(intersects[i].object.position, .5, {x:-2, ease: Expo.easeOut});
        tl.to(intersects[i].object.position, .5, {x:0, ease: Expo.easeOut});
        tl.to(intersects[i].object.scale, .5, {x:2, ease: Expo.easeOut},0);
        tl.to(intersects[i].object.scale, .5, {x:1, ease: Expo.easeOut});
    }

};

render();

window.addEventListener('click', onMouseMove);