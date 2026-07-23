import * as twgl from './twgl/dist/7.x/twgl-full.module.js';

var run_animation = true;
var animationId = -1;

async function main() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/css/background.css";
  document.head.appendChild(link);

  const m4 = twgl.m4;
  const v3 = twgl.v3;
  const canvas_region = document.getElementById("c");
  const gl = canvas_region.getContext("webgl");

  twgl.addExtensionsToContext(gl);
  if (!gl.drawArraysInstanced || !gl.createVertexArray) {
    alert("need drawArraysInstanced and createVertexArray"); // eslint-disable-line
    return;
  }

  const [vsSource, fsSource] = await Promise.all([
    fetch("/shaders/shader.vert").then(r => r.text()),
    fetch("/shaders/shader.frag").then(r => r.text()),
  ]);

  const programInfo = twgl.createProgramInfo(gl, [vsSource, fsSource]);

  function rand(min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return min + Math.random() * (max - min);
  }

  const area_width = 100;
  const numInstances = area_width*area_width;
  const instanceWorlds = new Float32Array(numInstances * 16);
  const instanceColors = [];
  const r = 70;

  for (let i = 0; i < numInstances; ++i) {
    const mat = new Float32Array(instanceWorlds.buffer, i * 16 * 4, 16);
    let x = ((i / area_width)*1.10) - (area_width/2) + rand(-0.05, 0.05);
    let y = rand(1);
    let z = ((i % area_width)*1.10) - (area_width/2) + rand(-0.05, 0.05);

    m4.translation([x, y, z], mat);
    //m4.rotateZ(mat, rand(0, Math.PI * 2), mat);
    //m4.rotateX(mat, rand(0, Math.PI * 2), mat);
    let hue = rand(0, 0.5);
    instanceColors.push(hue, hue, rand(hue, 0.75));
  }

  const arrays = twgl.primitives.createCubeVertices();
  Object.assign(arrays, {
    instanceWorld: {
      numComponents: 16,
      data: instanceWorlds,
      divisor: 1,
    },
    instanceColor: {
      numComponents: 3,
      data: instanceColors,
      divisor: 1,
    },
  });

  const uniforms = {
    u_lightWorldPos: [1, 8, -1],
    u_lightColor: [.5, .5, .5, 1],
    u_ambient: [0, 0, 0, 1],
    u_specular: [1, 1, 1, 1],
    u_shininess: 20,
    u_specularFactor: 0.5,
  };

  let animationTime = 0;
  let previousTime = 0;

  const fov = 30 * Math.PI / 180;
  let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;

  const zNear = 0.5;
  const zFar = 500;
  let projection = m4.perspective(fov, aspect, zNear, zFar);
  const radius = 20;
  let eye = [0, 20, 0];
  const target = [0, -2, 0];
  const up = [0, 1, 0];

  let camera = m4.lookAt(eye, target, up);
  let view = m4.inverse(camera);

  let viewProjection = m4.multiply(projection, view);

  var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
  var vertexArrayInfo = twgl.createVertexArrayInfo(gl, programInfo, bufferInfo);

  // Cast a ray when we click the canvas
  /*document.addEventListener("click", (event) => {
    const rect = canvas_region.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    const invViewProjection = m4.inverse(viewProjection);

    const near = [x, y, -1];
    const far  = [x, y,  1];

    const nearWorld = m4.transformPoint(invViewProjection, near);
    const farWorld  = m4.transformPoint(invViewProjection, far);

    const rayOrigin = eye;
    const rayDirection = v3.normalize(
        v3.subtract(farWorld, eye)
    );

    // Point at which y = 0
    let t = -rayOrigin[1]/rayDirection[1];

    let impactX = rayOrigin[0]+t*rayDirection[0];
    let impactZ = rayOrigin[2]+t*rayDirection[2];

    //let x = ((i / area_width)*1.10) - (area_width/2) + rand(-0.05, 0.05);
    //let y = rand(1);
    //let z = ((i % area_width)*1.10) - (area_width/2) + rand(-0.05, 0.05);
    
    let areaX = (impactX + (area_width/2))/1.10;
    let areaZ = (impactZ + (area_width/2))/1.10;
    let reconstructedIndex = Math.floor((areaX*area_width)+areaZ);

    console.log(rayOrigin, rayDirection, t, impactX, impactZ);

    console.log(x, y, reconstructedIndex);
    instanceColors[reconstructedIndex] = [1, 0, 0];
    Object.assign(arrays, {
      instanceWorld: {
        numComponents: 16,
        data: instanceWorlds,
        divisor: 1,
      },
      instanceColor: {
        numComponents: 3,
        data: instanceColors,
        divisor: 1,
      },
    });

    bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
    vertexArrayInfo = twgl.createVertexArrayInfo(gl, programInfo, bufferInfo);
  });*/

  function render(time) {
    if(previousTime == 0){
      previousTime = time;
    }
    let dt = (time - previousTime) * 0.001;
    animationTime += dt;
    previousTime = time;

    twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    projection = m4.perspective(fov, aspect, zNear, zFar);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.clearColor(0.15, 0.15, 0.15, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const speed = animationTime * .015;
    eye = [Math.sin(speed) * radius, 20, Math.cos(speed) * radius];
    camera = m4.lookAt(eye, target, up);
    view = m4.inverse(camera);
    
    viewProjection = m4.multiply(projection, view);
    uniforms.u_viewProjection = viewProjection;
    uniforms.u_viewInverse = camera;

    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, vertexArrayInfo);
    twgl.setUniforms(programInfo, uniforms);
    twgl.drawBufferInfo(gl, vertexArrayInfo, gl.TRIANGLES, 
                        vertexArrayInfo.numelements, 0, numInstances);

    animationId = requestAnimationFrame(render);
  }
  animationId = requestAnimationFrame(render);

  function add_stop_button(){
    const button_region = document.createElement("div");
    button_region.id = "stop-button-region";

    const button = document.createElement("button");
    button.id = "stop-button";
    button_region.appendChild(button);

    document.body.appendChild(button_region);
    
    button.classList.add(
      "inline-block",         "cursor-pointer",
      "item-center",          "justify-center",
      "rounded-lg",           "border",
      "border-zinc-600",      "bg-zinc-950",
      "px-3",                 "py-2",
      "font-medium",          "text-slate-200",
      "shadow-md",            "transition-all",
      "duration-300",         "hover:-translate-y-0.5",
      "hover:shadow-xl",      "text-sm",
      "stop-animation-button"
    )
    button.textContent = "Stop Animation";

    // handle the animation state
    button.addEventListener("click", () => {
      if (run_animation) {
        run_animation = false;
        cancelAnimationFrame(animationId);
        button.textContent = "Resume Animation";
      } else {
        run_animation = true;
        animationId = requestAnimationFrame(render);
        button.textContent = "Stop Animation";
        previousTime = 0;
      }
    });

  }

  add_stop_button();

}

main();
