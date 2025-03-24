export default class Player extends Phaser.Physics.Arcade.Sprite{
    
    constructor(scene,x,y,texture){
        super(scene,x,y,texture);
        this.x=x;
        this.y=y;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // this.scene=scene;
        // this.texture=texture;
        
    }
    

    
}