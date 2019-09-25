const CITY_RADIUS = 100,
    CITY_MARGIN = 1,
    BLINT_SPEED = 0.05,
    HEXAGON_RADIUS = 5,
    radius = 100
let scene, camera, renderer, clock, control
let earthImg, earthData, earthParticles = new THREE.Object3D(),
    // 多边形
    hexagon = new THREE.Object3D(),
    // 光锥
    plane = new THREE.Object3D(),
    // 地图边线
    line = new THREE.Object3D(),
    // 云层
    cloud = new THREE.Object3D(),
    // 背景
    backImg = new THREE.Object3D(),
    // 地图点材质
    dotTexture = new THREE.TextureLoader().load('/img/dot.png'),
    coneImg = ['/img/lightray.jpg', '/img/lightray_yellow.jpg', '/img/lightray_red.jpg'],
    //地标点颜色
    hexagonColor = ['#fff', '#ffee33', '#ff3341']

main()

function main() {
    earthImg = document.createElement('img')
    earthImg.src = '/earth.jpg'
    earthImg.onload = () => {
        let earthCanvas = document.createElement('canvas')
        earthCtx = earthCanvas.getContext('2d')
        earthCanvas.width = earthImg.width
        earthCanvas.height = earthImg.height
        earthCtx.drawImage(earthImg, 0, 0, earthImg.width, earthImg.height)
        earthImgData = earthCtx.getImageData(0, 0, earthImg.width, earthImg.height)
            // basic scene
        createBasicScene()
            // 地图边线
        cerateEarthLine()
            // 光锥
        createObjects()
            // 球面打点
        createEarthParticles()
            // 云层
        createCloudGrid()
            // 背景图片
            // backgroundImg()
        animate()
    }
}

function backgroundImg() {

    // let p = 2560,
    //     r = 1440,
    //     n = p / 590 * this.radius,
    //     o = r / 590 * this.radius,
    s = new THREE.PlaneGeometry(400, 400, 1), //定义一个平面
        earthBg = new THREE.TextureLoader().load('/img/bg.jpg') //拿到图片的皮肤
    var i = new THREE.MeshBasicMaterial; //定义材料

    i.fog = !0,
        // i.transparent = !0,
        i.opacity = 0,
        i.blending = THREE.AdditiveBlending,
        i.depthWrite = !1,
        i.map = earthBg,
        i.map.generateMipalphaMaps = !1,
        i.map.magFilter = THREE.LinearFilter,
        i.map.minFilter = THREE.LinearFilter,
        i.side = THREE.DoubleSide,
        d = new THREE.Mesh(s, i);
    backImg.add(d)
    scene.add(backImg)
}

function createBasicScene() {
    let width = window.innerWidth,
        height = window.innerHeight
    scene = new THREE.Scene()
    scene.background = new THREE.TextureLoader().load('/img/bg.jpg')
    camera = new THREE.PerspectiveCamera(28, width / height, 0.1, 10000)
    camera.position.z = 500
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
        // 清除颜色缓存
    renderer.autoClearColor = new THREE.Color(1, 0, 0, 0.5)
    document.querySelector('#three').appendChild(renderer.domElement)
        // 时间
    clock = new THREE.Clock()
        // 轨迹球控件
    control = new THREE.TrackballControls(camera)
    control.zoomSpeed = 0.2; // 缩放速度
    control.rotateSpeed = 0.2; // 旋转速度
    // control.panSpeed = 0.1; // 平controls
    control.staticMoving = false; // 静止移动，为 true 则没有惯性
    control.dynamicDampingFactor = 0.2; // 阻尼系数 越小 则滑动越大
    control.minDistance = 300; // 最小视角
    control.maxDistance = 470; // 最大视角 Infinity 无穷大
    // （直角坐标系）
    axes = new THREE.AxesHelper(CITY_RADIUS + 10)
    scene.add(axes)
    window.addEventListener('resize', resize)
}

function createObjects() {
    // 球面
    // let sphereGeom = new THREE.SphereGeometry(CITY_RADIUS, 20, 20),
    //     sphereMat = new THREE.MeshBasicMaterial({
    //         // MeshBasicMaterial是一种非常简单的材质，这种材质不考虑场景中光照的影响。使用这种材质的网格会被渲染成简单的平面多边形，而且也可以显示几何体的线框。
    //         color: 0x03d98e,
    //         wireframe: true
    //     })
    //     // 球和网格一起渲染到屏幕上
    // sphere = new THREE.Mesh(sphereGeom, sphereMat)
    // scene.add(sphere)
    // 地标及光锥
    for (let i = 0, length = countries.length; i < length; i++) {
        const position = createPosition(countries[i].position)
        const index = Math.floor(Math.random() * 3)
        createHexagon(position, index) // 地标
        createCone(position, index) // 光锥 
    }
    for (let i = 0, length = circle.length; i < length; i++) {
        const position = createPosition(circle[i].position)
        const index = Math.floor(Math.random() * 3)
        circles(position, index) // 海上的圈
    }
}

// 海上圈
function circles(position, index) {
    // const color = hexagonColor[index]
    if (index == 1) {
        let hexagonLine = new THREE.CircleGeometry(1.9, 100)
            // let hexagonPlane = new THREE.CircleGeometry(3 - 1, 100)
        let vertices = hexagonLine.vertices
        vertices.shift() // 第一个节点是中心点
        let circleLineGeom = new THREE.Geometry()
        circleLineGeom.vertices = vertices
        let materialLine = new THREE.MeshBasicMaterial({
            color: "#2e85bb",
            side: THREE.FrontSide,
            depthWrite: false,
            transparent: true,
            opacity: 0.2

        })
        let circleLine = new THREE.LineLoop(circleLineGeom, materialLine)
        circleLine.position.copy(position)
        circleLine.lookAt(new THREE.Vector3(0, 0, 0))

        hexagon.add(circleLine)
            // hexagon.add(circlePlane)
        scene.add(hexagon)
    } else {

    }

}


function cerateEarthLine() {
    let sphereGeom = new THREE.SphereGeometry(CITY_RADIUS, 20, 20)
    let earthLine = new THREE.TextureLoader().load('contour.jpg')
    let sphereMat = new THREE.MeshBasicMaterial({
        map: earthLine,
        color: new THREE.Color('#2e85bb'),
        depthWrite: false, //透视后面的材料
        generateMipalphaMaps: false,
        // side: THREE.DoubleSide,
    })
    sphereMat.map.generateMipalphaMaps = !1,
        sphereMat.map.magFilter = THREE.LinearFilter,
        sphereMat.map.minFilter = THREE.LinearFilter,
        sphereMat.needsUpdate = !0
    sphere = new THREE.Mesh(sphereGeom, sphereMat)
    earthParticles.add(sphere)
    scene.add(earthParticles)
}
// 地标
function createHexagon(position, index) {
    const color = hexagonColor[index]
        // 地标大小
        // let hexagonLine = new THREE.CircleGeometry(HEXAGON_RADIUS, 6)
        // let hexagonPlane = new THREE.CircleGeometry(HEXAGON_RADIUS - CITY_MARGIN, 6)
    let hexagonLine = new THREE.CircleGeometry(3, 100)
    let hexagonPlane = new THREE.CircleGeometry(3 - 1, 100)
    let vertices = hexagonLine.vertices
    vertices.shift() // 第一个节点是中心点
    let circleLineGeom = new THREE.Geometry()
    circleLineGeom.vertices = vertices
    let materialLine = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,

    })
    let materialPlane = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
        opacity: 0.2
    })
    let circleLine = new THREE.LineLoop(circleLineGeom, materialLine)
    let circlePlane = new THREE.Mesh(hexagonPlane, materialPlane)
    circleLine.position.copy(position)
    circlePlane.position.copy(position)
    circlePlane.lookAt(new THREE.Vector3(0, 0, 0))
    circleLine.lookAt(new THREE.Vector3(0, 0, 0))

    hexagon.add(circleLine)
    hexagon.add(circlePlane)
    scene.add(hexagon)
}
// 光锥
function createCone(position, index) {
    let texture = new THREE.TextureLoader().load(coneImg[index]),
        material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            depthTest: false,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending

        }),
        // height = Math.random() * 50,
        // geometry = new THREE.PlaneGeometry(HEXAGON_RADIUS * 2, height),
        height = 30,
        geometry = new THREE.PlaneGeometry(5, height),
        plane1 = new THREE.Mesh(geometry, material),
        matrix1 = new THREE.Matrix4
    matrix1.makeRotationX(Math.PI / 2)
    matrix1.setPosition(new THREE.Vector3(0, 0, height / -2))
    geometry.applyMatrix(matrix1)
    let plane2 = plane1.clone()
    plane2.rotation.z = Math.PI / 2
    plane1.add(plane2)
    plane1.position.copy(position)
    plane1.lookAt(0, 0, 0)
    plane.add(plane1)
    scene.add(plane)
}

function createEarthParticles() {
    let positions = []
    let materials = []
    let sizes = []
    for (var i = 0; i < 2; i++) {
        positions[i] = {
            positions: []
        }
        sizes[i] = {
                sizes: []
            }
            // 点材质
        mat = new THREE.PointsMaterial()
        mat.size = 4
        mat.color = new THREE.Color('#2e85ff')
        mat.map = dotTexture
        mat.depthWrite = false
        mat.transparent = true
        mat.opacity = 0
        mat.side = THREE.FrontSide
        mat.blending = THREE.AdditiveBlending
        let n = i / 2
        mat.t_ = n * Math.PI * 2
        mat.speed_ = BLINT_SPEED
        mat.min_ = .2 * Math.random() + .5
        mat.delta_ = .1 * Math.random() + .1
        mat.opacity_coef_ = 1
        materials.push(mat)
    }
    var spherical = new THREE.Spherical
    spherical.radius = radius
    const step = 250
    for (let i = 0; i < step; i++) {
        let vec = new THREE.Vector3
        let radians = step * (1 - Math.sin(i / step * Math.PI)) / step + .5 // 每个纬线圈内的角度均分
        for (let j = 0; j < step; j += radians) {
            let c = j / step, // 底图上的横向百分比
                f = i / step, // 底图上的纵向百分比
                index = Math.floor(2 * Math.random())
            pos = positions[index]
            size = sizes[index]
            if (isLandByUV(c, f)) { // 根据横纵百分比判断在底图中的像素值
                spherical.theta = c * Math.PI * 2 - Math.PI / 2 // 横纵百分比转换为theta和phi夹角
                spherical.phi = f * Math.PI // 横纵百分比转换为theta和phi夹角
                vec.setFromSpherical(spherical) // 夹角转换为世界坐标
                pos.positions.push(vec.x)
                pos.positions.push(vec.y)
                pos.positions.push(vec.z)
                if (j % 3 === 0) {
                    size.sizes.push(6.0)
                }
            }
        }
    }
    for (let i = 0; i < positions.length; i++) {
        let pos = positions[i],
            size = sizes[i],
            bufferGeom = new THREE.BufferGeometry,
            typedArr1 = new Float32Array(pos.positions.length),
            typedArr2 = new Float32Array(size.sizes.length)
        for (let j = 0; j < pos.positions.length; j++) {
            typedArr1[j] = pos.positions[j]
        }
        for (let j = 0; j < size.sizes.length; j++) {
            typedArr2[j] = size.sizes[j]
        }
        bufferGeom.addAttribute("position", new THREE.BufferAttribute(typedArr1, 3))
        bufferGeom.addAttribute('size', new THREE.BufferAttribute(typedArr2, 1))
        bufferGeom.computeBoundingSphere()
        let particle = new THREE.Points(bufferGeom, materials[i])
        earthParticles.add(particle)
    }
    scene.add(earthParticles)
}

function createCloudGrid() {
    THREE.XRayMaterial = function(options) {
        let uniforms = {
            uTex: {
                type: "t",
                value: options.map || new THREE.Texture
            },
            offsetRepeat: {
                value: new THREE.Vector4(0, 0, 1, 1)
            },
            alphaProportion: {
                type: "1f",
                value: options.alphaProportion || .5
            },
            diffuse: {
                value: options.color || new THREE.Color(16777215)
            },
            opacity: {
                value: options.opacity || 1
            },
            gridOffset: {
                value: 0
            }
        }
        return new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: ` 
varying float _alpha;
varying vec2 vUv;
uniform vec4 offsetRepeat;
uniform float alphaProportion;
void main() {
gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
vUv = uv * offsetRepeat.zw + offsetRepeat.xy;
vec4 worldPosition = modelMatrix * vec4( vec3( position ), 1.0 );
vec3 cameraToVertex = normalize( cameraPosition - worldPosition.xyz);
_alpha = 1.0 - max( 0.0, dot( normal, cameraToVertex ) );
_alpha = max( 0.0, (_alpha - alphaProportion) / (1.0 - alphaProportion) );
}`,
            fragmentShader: `
uniform sampler2D uTex;
uniform vec3 diffuse;
uniform float opacity;
uniform float gridOffset;
varying float _alpha;
varying vec2 vUv;
void main() {
vec4 texColor = texture2D( uTex, vUv );
float _a = _alpha * opacity;
if( _a <= 0.0 ) discard;
_a = _a * ( sin( vUv.y * 2000.0 + gridOffset ) * .5 + .5 );
gl_FragColor = vec4( texColor.rgb * diffuse, _a );
}`,
            transparent: !0,
            blending: THREE.AdditiveBlending,
            depthTest: !1
        })
    }
    let geometry = new THREE.SphereGeometry(1.3 * radius, 66, 44),
        map = new THREE.TextureLoader().load('/clouds.jpg')
    map.wrapT = THREE.ClampToEdgeWrapping
    map.wrapS = THREE.ClampToEdgeWrapping
    let material = new THREE.XRayMaterial({
            map: map,
            alphaProportion: .25,
            color: new THREE.Color('#2e85ff'),
            opacity: 0.5,
            gridOffsetSpeed: .6
        }),
        mesh = new THREE.Mesh(geometry, material)
    mesh.matrixAutoUpdate = !1
    cloud.add(mesh)
    scene.add(cloud)
}

function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
}

function render() {
    let delta = clock.getDelta()
        //返回的结果是两次调用render函数的时间差值，语句controls.update(T);的作用就是利用得到的时间差与相机控件对象的速度参数相乘来更新相机对象的数据。
    control.update(delta)
    renderer.render(scene, camera)
}

function animate() {
    requestAnimationFrame(animate)
        // 球面粒子闪烁
    let objects = earthParticles.children
    objects.forEach(obj => {
        let material = obj.material
        material.t_ += material.speed_
        material.opacity = (Math.sin(material.t_) * material.delta_ + material.min_) * material.opacity_coef_
        material.needsUpdate = true;
    })
    hexagon.rotation.y += 0.001;
    cloud.rotation.y += 0.001;
    earthParticles.rotation.y += 0.001;
    line.rotation.y += 0.001;
    // window.plane2.rotation.y += 0.001;
    // sphere.rotation.y += 0.001;
    plane.rotation.y += 0.001;
    render()
}

function createPosition(lnglat) {
    let spherical = new THREE.Spherical
    spherical.radius = radius
    const lng = lnglat[0]
    const lat = lnglat[1]
        // const phi = (180 - lng) * (Math.PI / 180)
        // const theta = (90 + lat) * (Math.PI / 180)
    const theta = (lng + 90) * (Math.PI / 180)
    const phi = (90 - lat) * (Math.PI / 180)
    spherical.phi = phi
    spherical.theta = theta
    let position = new THREE.Vector3()
    position.setFromSpherical(spherical)
    return position
}

function isLandByUV(c, f) {
    if (!earthImgData) { // 底图数据
        console.error('data error!')
    }
    let n = parseInt(earthImg.width * c) // 根据横纵百分比计算图象坐标系中的坐标
    o = parseInt(earthImg.height * f) // 根据横纵百分比计算图象坐标系中的坐标
    return 0 === earthImgData.data[4 * (o * earthImgData.width + n)] // 查找底图中对应像素点的rgba值并判断
}
var circle = [{
        position: [-68.20, 25.05]
    }, {
        position: [-60.20, 25.24]
    }, {
        position: [-55.20, 24.24]
    }, {
        position: [-50.20, 23.24]
    }, {
        position: [-49.20, 21.24]
    }, {
        position: [-45.20, 19.24]
    }, {
        position: [-30.20, 50.05]
    }, {
        position: [-30.20, 40.05]
    }, {
        position: [-30.20, 30.05]
    }, {
        position: [-30.20, 20.05]
    }, {
        position: [-30.20, 10.05]
    }, {
        position: [-30.20, 0.05]
    }, {
        position: [-30.20, -10.05]
    }, {
        position: [-30.20, -20.05]
    }, {
        position: [-30.20, -30.05]
    }, {
        position: [-30.20, -40.05]
    }, {
        position: [-30.20, -50.05]
    }, {
        position: [-30.20, -60.05]
    }, {
        position: [-20.20, 50.05]
    }, {
        position: [-20.20, 40.05]
    }, {
        position: [-20.20, 30.05]
    }, {
        position: [-20.20, 20.05]
    }, {
        position: [-20.20, 10.05]
    }, {
        position: [-20.20, 0.05]
    }, {
        position: [-20.20, -10.05]
    }, {
        position: [-20.20, -20.05]
    }, {
        position: [-20.20, -30.05]
    }, {
        position: [-20.20, -40.05]
    }, {
        position: [-20.20, -50.05]
    }, {
        position: [-20.20, -60.05]
    },
    {
        position: [0.20, 0.05]
    }, {
        position: [0.20, -10.05]
    }, {
        position: [0.20, -20.05]
    }, {
        position: [0.20, -30.05]
    }, {
        position: [0.20, -40.05]
    }, {
        position: [0.20, -50.05]
    }, {
        position: [0.20, -60.05]
    },
    {
        position: [-150.20, 50.05]
    }, {
        position: [-150.20, 40.05]
    }, {
        position: [-150.20, 30.05]
    }, {
        position: [-150.20, 20.05]
    }, {
        position: [-150.20, 10.05]
    }, {
        position: [-150.20, 0.05]
    }, {
        position: [-150.20, -10.05]
    }, {
        position: [-150.20, -20.05]
    }, {
        position: [-150.20, -30.05]
    }, {
        position: [-150.20, -40.05]
    }, {
        position: [-150.20, -50.05]
    }, {
        position: [-150.20, -60.05]
    },
    {
        position: [-140.20, 50.05]
    }, {
        position: [-140.20, 40.05]
    }, {
        position: [-140.20, 30.05]
    }, {
        position: [-140.20, 20.05]
    }, {
        position: [-140.20, 10.05]
    }, {
        position: [-140.20, 0.05]
    }, {
        position: [-140.20, -10.05]
    }, {
        position: [-140.20, -20.05]
    }, {
        position: [-140.20, -30.05]
    }, {
        position: [-140.20, -40.05]
    }, {
        position: [-140.20, -50.05]
    }, {
        position: [-140.20, -60.05]
    },
    {
        position: [-130.20, 50.05]
    }, {
        position: [-130.20, 40.05]
    }, {
        position: [-130.20, 30.05]
    }, {
        position: [-130.20, 20.05]
    }, {
        position: [-130.20, 10.05]
    }, {
        position: [-130.20, 0.05]
    }, {
        position: [-130.20, -10.05]
    }, {
        position: [-130.20, -20.05]
    }, {
        position: [-130.20, -30.05]
    }, {
        position: [-130.20, -40.05]
    }, {
        position: [-130.20, -50.05]
    }, {
        position: [-130.20, -60.05]
    },
    {
        position: [-120.20, 30.05]
    }, {
        position: [-120.20, 20.05]
    }, {
        position: [-120.20, 10.05]
    }, {
        position: [-120.20, 0.05]
    }, {
        position: [-120.20, -10.05]
    }, {
        position: [-120.20, -20.05]
    }, {
        position: [-120.20, -30.05]
    }, {
        position: [-120.20, -40.05]
    }, {
        position: [-120.20, -50.05]
    }, {
        position: [-120.20, -60.05]
    },
    {
        position: [-160.20, 50.05]
    }, {
        position: [-160.20, 40.05]
    }, {
        position: [-160.20, 30.05]
    }, {
        position: [-160.20, 20.05]
    }, {
        position: [-160.20, 10.05]
    }, {
        position: [-160.20, 0.05]
    }, {
        position: [-160.20, -10.05]
    }, {
        position: [-160.20, -20.05]
    }, {
        position: [-160.20, -30.05]
    }, {
        position: [-160.20, -40.05]
    }, {
        position: [-160.20, -50.05]
    }, {
        position: [-160.20, -60.05]
    },
    {
        position: [-170.20, 50.05]
    }, {
        position: [-170.20, 40.05]
    }, {
        position: [-170.20, 30.05]
    }, {
        position: [-170.20, 20.05]
    }, {
        position: [-170.20, 10.05]
    }, {
        position: [-170.20, 0.05]
    }, {
        position: [-170.20, -10.05]
    }, {
        position: [-170.20, -20.05]
    }, {
        position: [-170.20, -30.05]
    }, {
        position: [-170.20, -40.05]
    }, {
        position: [-170.20, -50.05]
    }, {
        position: [-170.20, -60.05]
    },
    {
        position: [-180.20, 50.05]
    }, {
        position: [-180.20, 40.05]
    }, {
        position: [-180.20, 30.05]
    }, {
        position: [-180.20, 20.05]
    }, {
        position: [-180.20, 10.05]
    }, {
        position: [-180.20, 0.05]
    }, {
        position: [-180.20, -10.05]
    }, {
        position: [-180.20, -20.05]
    }, {
        position: [-180.20, -30.05]
    }, {
        position: [-180.20, -40.05]
    }, {
        position: [-180.20, -50.05]
    }, {
        position: [-180.20, -60.05]
    },

    {
        position: [-190.20, 50.05]
    }, {
        position: [-190.20, 40.05]
    }, {
        position: [-190.20, 30.05]
    }, {
        position: [-190.20, 20.05]
    }, {
        position: [-190.20, 10.05]
    }, {
        position: [-190.20, 0.05]
    }, {
        position: [-190.20, -10.05]
    }, {
        position: [-190.20, -20.05]
    }, {
        position: [-190.20, -30.05]
    }, {
        position: [-190.20, -40.05]
    },

    {
        position: [60.20, -50.05]
    }, {
        position: [60.20, -60.05]
    }, {
        position: [60.20, 10.05]
    }, {
        position: [60.20, 0.05]
    }, {
        position: [60.20, -10.05]
    }, {
        position: [60.20, -20.05]
    }, {
        position: [60.20, -30.05]
    }, {
        position: [60.20, -40.05]
    },
    {
        position: [70.20, -50.05]
    }, {
        position: [70.20, -60.05]
    }, {
        position: [70.20, 10.05]
    }, {
        position: [70.20, 0.05]
    }, {
        position: [70.20, -10.05]
    }, {
        position: [70.20, -20.05]
    }, {
        position: [70.20, -30.05]
    }, {
        position: [70.20, -40.05]
    },
    {
        position: [50.20, -50.05]
    }, {
        position: [50.20, -60.05]
    }, {
        position: [50.20, 10.05]
    }, {
        position: [50.20, 0.05]
    }, {
        position: [50.20, -10.05]
    }, {
        position: [50.20, -20.05]
    }, {
        position: [50.20, -30.05]
    }, {
        position: [50.20, -40.05]
    },
    {
        position: [80.20, -50.05]
    }, {
        position: [80.20, -60.05]
    }, {
        position: [80.20, 10.05]
    }, {
        position: [80.20, 0.05]
    }, {
        position: [80.20, -10.05]
    }, {
        position: [80.20, -20.05]
    }, {
        position: [80.20, -30.05]
    }, {
        position: [80.20, -40.05]
    },
    // {
    //     name: "巴巴多斯",
    //     position: [-59.30, 13.05]
    // }, {
    //     name: "澳大利亚",
    //     position: [149.08, -35.15]
    // }, {
    //     name: "奥地利",
    //     position: [16.22, 48.12]
    // }, {
    //     name: "安提瓜和巴布达",
    //     position: [-61.48, 17.20]
    // }, {
    //     name: "安哥拉",
    //     position: [13.15, -8.50]
    // }, {
    //     name: "安道尔",
    //     position: [1.32, 42.31]
    // }, {
    //     name: "爱沙尼亚",
    //     position: [24.48, 59.22]
    // }, {
    //     name: "爱尔兰",
    //     position: [-6.15, 53.21]
    // }, {
    //     name: "埃塞俄比亚",
    //     position: [38.42, 9.02]
    // }, {
    //     name: "埃及",
    //     position: [31.14, 30.01]
    // }, {
    //     name: "阿塞拜疆",
    //     position: [49.56, 40.29]
    // }, {
    //     name: "阿尔及利亚",
    //     position: [3.08, 36.42]
    // }, {
    //     name: "阿尔巴尼亚",
    //     position: [19.49, 41.18]
    // }
]
var countries = [{
    name: "中国",
    position: [116.20, 39.55],
    srcCount: 1, //圈大小
    attackCount: 1, //光柱高度
    info: {

    }
}, {
    name: "比利时",
    position: [4.21, 50.51]
}, {
    name: "比勒陀利亚",
    position: [28.12, -25.44]
}, {
    name: "贝宁",
    position: [2.42, 6.23]
}, {
    name: "北马里亚纳群岛",
    position: [145.45, 15.12]
}, {
    name: "保加利亚",
    position: [23.20, 42.45]
}, {
    name: "白俄罗斯",
    position: [27.30, 53.52]
}, {
    name: "巴西",
    position: [-47.55, -15.47]
}, {
    name: "巴拿马",
    position: [-79.25, 9.00]
}, {
    name: "巴林",
    position: [50.30, 26.10]
}, {
    name: "巴拉圭",
    position: [-57.30, -25.10]
}, {
    name: "巴基斯坦",
    position: [73.10, 33.40]
}]


// {
//     name: "巴哈马",
//     position: [-77.20, 25.05]
// }, {
//     name: "巴布亚新几内亚",
//     position: [147.08, -9.24]
// }, {
//     name: "巴巴多斯",
//     position: [-59.30, 13.05]
// }, {
//     name: "澳大利亚",
//     position: [149.08, -35.15]
// }, {
//     name: "奥地利",
//     position: [16.22, 48.12]
// }, {
//     name: "安提瓜和巴布达",
//     position: [-61.48, 17.20]
// }, {
//     name: "安哥拉",
//     position: [13.15, -8.50]
// }, {
//     name: "安道尔",
//     position: [1.32, 42.31]
// }, {
//     name: "爱沙尼亚",
//     position: [24.48, 59.22]
// }, {
//     name: "爱尔兰",
//     position: [-6.15, 53.21]
// }, {
//     name: "埃塞俄比亚",
//     position: [38.42, 9.02]
// }, {
//     name: "埃及",
//     position: [31.14, 30.01]
// }, {
//     name: "阿塞拜疆",
//     position: [49.56, 40.29]
// }, {
//     name: "阿尔及利亚",
//     position: [3.08, 36.42]
// }, {
//     name: "阿尔巴尼亚",
//     position: [19.49, 41.18]
// }