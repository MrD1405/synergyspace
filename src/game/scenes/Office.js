import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import Player from './Player';

export class Office extends Scene
{
    cursors;
    
    constructor ()
    {
        super('Office');
    }
    
    preload(){
       

        //loading spritesheet
        this.load.atlas('male_character','../../../assets/anim/Adam_16x16.png',
            '../../../assets/anim/sprites.json');
        
    }
    create ()
    {
        //loading tilemap
        const map=this.make.tilemap({key:'map'});
        const tileset=map.addTilesetImage('Interiors','tiles',32,32,0,0);
        const tilesetFloor=map.addTilesetImage('flooring','flooring',32,32,0,0);
        const layer1=map.createLayer('Tile Layer 1',tilesetFloor,0,0)
        const layer2=map.createLayer('objects',tileset,0,0);
        

        //input
        this.cursors=this.input.keyboard.createCursorKeys();
        // console.log(cursors);
        this.inputKeys=this.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D,
        })
        
        //assigning each frame based on name in spritesheet
        
        this.anims.create({
            key:'idle-right',
            frames:this.anims.generateFrameNames('male_character',{prefix:'idle_right',start:1,end:6,zeroPad:2}),
            frameRate:8,
            repeat:-1,
        })
        this.anims.create({
            key:'idle-left',
            frames:this.anims.generateFrameNames('male_character',{prefix:'idle_left',start:1,end:6,zeroPad:2}),
            frameRate:8,
            repeat:-1,
            
        })
        this.anims.create({
            key:'run-left',
            frames:this.anims.generateFrameNames('male_character',{prefix:'run_left',start:1,end:5,zeroPad:2}),
            frameRate:8,
            repeat:-1,
        })
        this.anims.create({
            key:'run-right',
            frames:this.anims.generateFrameNames('male_character',{prefix:'run_right',start:1,end:6,zeroPad:2}),
            frameRate:8,
            repeat:-1,
        })

        //adding physics and enabling collision
        // this.player=this.physics.add.sprite(400,300,'male_character');
        this.player_instance=new Player(this,400,300,'male_character');

        // this.physics.add.sprite(player_instance.x,player_instance.y,player_instance);
        this.player_instance.setBounce(0.2);
        this.player_instance.setCollideWorldBounds(true);
        layer2.setCollisionByExclusion([-1]);
        this.physics.add.collider(layer2,this.player_instance);
        EventBus.emit('current-scene-ready', this);
        
        this.player2=this.physics.add.sprite(500,400,'male_character');
        this.player2.setCollideWorldBounds(true);
        this.player2.setBounce(0.2);
        this.physics.add.collider(this.player_instance,this.player2);
        this.physics.add.collider(this.player2,layer2);
    }
    
    update(){
        const speed=60.5;

        //changing velocity of player based on input
        let playerVelocity=new Phaser.Math.Vector2();
        if(!this.inputKeys.left.isDown && !this.inputKeys.right.isDown&& !this.inputKeys.up.isDown&& !this.inputKeys.down.isDown ){
            this.player_instance.anims.play('idle-right',true);
        }
        if(this.inputKeys.left.isDown){
            playerVelocity.x=-1;
            this.player_instance.anims.play('run-left',true)

        }
        else if(this.inputKeys.right.isDown){
            playerVelocity.x=1;
            this.player_instance.anims.play('run-right',true);
        }
        if(this.inputKeys.up.isDown){
            playerVelocity.y=-1;
            this.player_instance.anims.play('run-right',true);
        }
        else if(this.inputKeys.down.isDown){
            playerVelocity.y=1;
            this.player_instance.anims.play('run-right',true);
        }

        let player2_velocity=new Phaser.Math.Vector2();
        if(!this.cursors.left.isDown && !this.cursors.right.isDown&& !this.cursors.up.isDown&& !this.cursors.down.isDown ){
            this.player2.anims.play('idle-right',true);
        }
        if(this.cursors.left.isDown){
            player2_velocity.x=-1;
            this.player2.anims.play('run-left',true)

        }
        else if(this.cursors.right.isDown){
            player2_velocity.x=1;
            this.player2.anims.play('run-right',true);
        }
        if(this.cursors.up.isDown){
            player2_velocity.y=-1;
            this.player2.anims.play('run-right',true);
        }
        else if(this.cursors.down.isDown){
            player2_velocity.y=1;
            this.player2.anims.play('run-right',true);
        }
        player2_velocity.normalize();
        player2_velocity.scale(speed);
        this.player2.setVelocity(player2_velocity.x,player2_velocity.y);
        //console.log(playerVelocity.x,playerVelocity.y);
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        
        this.player_instance.setVelocity(playerVelocity.x,playerVelocity.y);
        
        

    }
    changeScene ()
    {
        this.scene.start('MainMenu');
    }
}
