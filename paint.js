/**
 * paint.js: Exact Lusion-style smooth dot/disc cursor trail that pops instantly under the mouse and fades out in milliseconds.
 */
(function () {
    function initOGL() {
        var OGL = window.ogl || window.OGL;
        if (!OGL) return;

        if (document.getElementById('full-site-paint-canvas')) return;

        if (!document.body) {
            setTimeout(initOGL, 20);
            return;
        }

        var canvas = document.createElement('canvas');
        canvas.id = 'full-site-paint-canvas';
        var cs = canvas.style;
        cs.position = 'fixed';
        cs.top = '0';
        cs.left = '0';
        cs.width = '100vw';
        cs.height = '100vh';
        cs.display = 'block';
        cs.pointerEvents = 'none';
        cs.zIndex = '99999';
        document.body.appendChild(canvas);

        var renderer, gl;
        try {
            renderer = new OGL.Renderer({ canvas: canvas, dpr: Math.min(window.devicePixelRatio || 1, 2), alpha: true });
            gl = renderer.gl;
        } catch (err) {
            return;
        }
        if (!gl) return;

        var w = window.innerWidth, h = window.innerHeight;
        renderer.setSize(w, h);

        function createRT(rw, rh) {
            return new OGL.RenderTarget(gl, {
                width: rw,
                height: rh,
                depth: false,
                format: gl.RGBA,
                type: gl.UNSIGNED_BYTE,
                minFilter: gl.LINEAR,
                magFilter: gl.LINEAR
            });
        }

        var rw = Math.floor(w * 0.5), rh = Math.floor(h * 0.5);
        var rtA = createRT(rw, rh);
        var rtB = createRT(rw, rh);
        var current = rtA, next = rtB;

        var geometry = new OGL.Geometry(gl, {
            position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
            uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) }
        });

        var simVert = [
            "attribute vec2 uv;",
            "attribute vec2 position;",
            "varying vec2 vUv;",
            "void main() {",
            "   vUv = uv;",
            "   gl_Position = vec4(position, 0.0, 1.0);",
            "}"
        ].join("\n");

        // Extremely fast fade out (multiplied by 0.6) so it disappears instantly like Lusion's cursor dots
        var simFrag = [
            "precision highp float;",
            "uniform sampler2D tState;",
            "uniform vec2 uMouse;",
            "uniform float uRadius;",
            "uniform vec2 uAspect;",
            "varying vec2 vUv;",
            "void main() {",
            "   vec2 uv = vUv;",
            "   vec4 info = texture2D(tState, uv);",
            "   ",
            "   // Quick fade out",
            "   float intensity = info.r * 0.60;",
            "   ",
            "   if (uRadius > 0.0) {",
            "       vec2 p1 = uv * uAspect;",
            "       vec2 p2 = uMouse * uAspect;",
            "       float dist = length(p1 - p2);",
            "       if (dist < uRadius) {",
            "           float drop = 1.0 - (dist / uRadius);",
            "           intensity = max(intensity, drop);",
            "       }",
            "   }",
            "   gl_FragColor = vec4(intensity, 0.0, 0.0, 1.0);",
            "}"
        ].join("\n");

        var renderFrag = [
            "precision highp float;",
            "uniform sampler2D tState;",
            "varying vec2 vUv;",
            "void main() {",
            "   vec2 uv = vUv;",
            "   float intensity = texture2D(tState, uv).r;",
            "   vec3 luxuryGold = vec3(0.77, 0.63, 0.35);",
            "   vec3 col = luxuryGold * 1.3;",
            "   gl_FragColor = vec4(col, intensity * 0.9);",
            "}"
        ].join("\n");

        var aspectVec = new OGL.Vec2(w / h, 1.0);

        var simProg = new OGL.Program(gl, {
            vertex: simVert,
            fragment: simFrag,
            depthTest: false,
            depthWrite: false,
            uniforms: {
                tState: { value: current.texture },
                uMouse: { value: new OGL.Vec2(0.5, 0.5) },
                uRadius: { value: 0.0 },
                uAspect: { value: aspectVec }
            }
        });

        var renderProg = new OGL.Program(gl, {
            vertex: simVert,
            fragment: renderFrag,
            depthTest: false,
            depthWrite: false,
            transparent: true,
            uniforms: {
                tState: { value: current.texture }
            }
        });

        var simMesh = new OGL.Mesh(gl, { geometry: geometry, program: simProg });
        var renderMesh = new OGL.Mesh(gl, { geometry: geometry, program: renderProg });

        var mouse = { x: 0.5, y: 0.5, active: false };
        window.addEventListener('mousemove', function (e) {
            mouse.x = e.clientX / window.innerWidth;
            mouse.y = 1.0 - (e.clientY / window.innerHeight);
            mouse.active = true;
        });

        window.addEventListener('resize', function () {
            var w = window.innerWidth, h = window.innerHeight;
            renderer.setSize(w, h);
            rw = Math.floor(w * 0.5);
            rh = Math.floor(h * 0.5);
            rtA = createRT(rw, rh);
            rtB = createRT(rw, rh);
            current = rtA; next = rtB;
            aspectVec.set(w / h, 1.0);
        });

        function update() {
            requestAnimationFrame(update);
            if (document.hidden) return;

            // Small crisp radius (0.015) matching clean cursor trailing discs
            var radius = mouse.active ? 0.015 : 0.0;
            mouse.active = false;

            simProg.uniforms.tState.value = current.texture;
            simProg.uniforms.uMouse.value.set(mouse.x, mouse.y);
            simProg.uniforms.uRadius.value = radius;

            renderer.render({ scene: simMesh, target: next });

            renderProg.uniforms.tState.value = next.texture;
            renderer.render({ scene: renderMesh });

            var t = current; current = next; next = t;
        }
        requestAnimationFrame(update);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOGL);
    } else {
        initOGL();
    }
})();