class Game{
     IsAnimateOver = true;
    onLoad(textureName){
       
        this.clock = new THREE.Clock();

        // this.animations = ["Walking" ,"Twilight_Idle","Twilight_JumpEnd","Twilight_JumpLoop","Twilight_JumpStart","Twilight_Run"]; 
        //this.animations = ["start","clap1","clap2","dance1","dance2","dance3","dance4","dance5","drum1","ex1","no1","idel1","idel2","idel3","idel4","vic1","vic2","where1" ];

        this.animations = ["dance1","dance2","dance3","dance4","dance5","where1","idel1","idel2","idel3","idel4","vic1","vic2","idel3","no1" ];
        
		this.init(textureName);
    }
    

    init(textureName) {
        
        const container = document.createElement( 'div' );
        document.getElementById('3dcView').appendChild( container );

        this.camera = new THREE.PerspectiveCamera( 100, 1000/1000, 0.1, 1000 );
        this.camera.position.set( 30, 150, 180 );

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x00000);
        this.scene.fog = new THREE.Fog( 0xa0a0a0, 1000, 1000 );

        let light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
        light.position.set( 0, 20, 0 );
        this.scene.add( light );

        light = new THREE.DirectionalLight( 0xaaaaaa );
        light.position.set( 1, 2, 20 );
        light.castShadow = false;
        light.shadow.camera.top = -180;
        light.shadow.camera.bottom = 100;
        light.shadow.camera.left =  110;
        light.shadow.camera.right = 110;
        this.scene.add( light );

        // ground
        const mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 3000, 3000 ), new THREE.MeshPhongMaterial( { color: 0x000000, depthWrite: false } ) );
        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;
        this.scene.add( mesh );

        const grid = new THREE.GridHelper( 3000, 200, 0xFF00CC, 0xFF00CC );
        grid.material.opacity = 0.25;
        grid.material.transparent = true;
        this.scene.add( grid );

        var plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry( 119, 400 ),
            new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x101010 } )
        );
        plane.rotation.x = - Math.PI / 2;
        plane.position.y = - 0.5;
        this.scene.add( plane );

        var plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry( 304, 200 ),
            new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x101010 } )
        );
        plane.rotation.x = - Math.PI / 2;
        plane.position.y = - 0.5;
        this.scene.add( plane );    


        // model
        const self = this;
        const loader = new THREE.FBXLoader();
        loader.load( 'FireFighter.fbx', function ( object ) {

            self.mixer = new THREE.AnimationMixer( object );
            self.actions = [];

            object.traverse( function ( child ) {

                if ( child.isMesh ) {

                    child.material.map = null;
                    child.castShadow = true;
                    child.receiveShadow = false;

                }

            } );
            if(textureName == null)
            {
                textureName = "FireFighter";
            }
          
            const tloader = new THREE.TextureLoader();
            tloader.load(textureName + ".png", function(texture){
                object.traverse( function ( child ) {
                    if ( child.isMesh ) child.material.map = texture;
                });
            });
            
            self.scene.add( object );
           


            self.loadNextAnim(loader);
           
        } );
        



        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    
        this.renderer.setPixelRatio( 0.8 );
        console.log(window.devicePixelRatio);
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.shadowMap.enabled = true;
        container.appendChild( this.renderer.domElement );

        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
        this.controls.target.set( -100, 150, 10 );
        this.controls.update();
        
        window.addEventListener( 'resize', function(){ self.resize();}, false );
       
    }

    loadNextAnim(loader){

        
        const anim = this.animations.pop();
        const self = this;
        
        loader.load( `${anim}.fbx`, function ( object ) {

            const action = self.mixer.clipAction( object.animations[ 0 ] );
            self.actions.push(action);

            object.traverse( function ( child ) {

                if ( child.isMesh ) {
                    
                    child.castShadow = true;
                    child.receiveShadow = false;

                }

            } );

            self.scene.add( object );
            
            if (self.animations.length>0){
                self.loadNextAnim(loader);
            }else{
                self.animate();
            }

        } );
    }
    
    stopAnimation(){
        this.mixer.stopAllAction();    
    }
    
    playAnimation(index){
        this.mixer.stopAllAction();
        const action = this.actions[index];
        action.weight = 1;
        action.fadeIn(0.5);
        action.play();
      
    }
    
    blendAnimations(weight){
        weight = Number(weight);
        this.mixer.stopAllAction();
        
        this.actions.forEach(function(action){
            action.fadeIn(0.5);
            action.play();
            action.weight = weight;
            weight = 1.0 - weight;
        });
    }
    
    resize() {

        this.camera.aspect = 500, 300;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( 500, 300 );

    }

    animate() {
        const self = this;
        
        requestAnimationFrame( function(){ self.animate(); } );

        const delta = this.clock.getDelta();

        if ( this.mixer ) this.mixer.update( delta );

        this.renderer.render( this.scene, this.camera );
    }

     changeTextture() {
         alert();
        
        // this.constructor("FireFighter2");
        
      }
       
    
    
      
    
    
}