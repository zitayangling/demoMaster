cc.Class({
    extends: cc.Component,

    properties: {
        backGround: cc.Node,
        majiang: cc.Node,
        label: cc.Label,
        currIndex: 0,
    },
    move: function() {
        var move = cc.moveTo(1.6, this.fours[this.currIndex]);
        var scaleBig = cc.scaleTo(1, 1.2);
        var scalexiao = cc.scaleTo(0.2,0.5);
        var scaleBig1 = cc.scaleTo(0.2, 1.2);
        var scalexiao1 = cc.scaleTo(0.2,0.5);
        var scaleSeq = cc.sequence(scaleBig,scalexiao,scaleBig1,scalexiao1);
        
        var spaw = cc.spawn(move,scaleSeq);
        var callback = cc.callFunc(function(){
            this.isOpen = 1;  
        }, this);
        var sequence = cc.sequence(spaw,callback);
        this.majiang.runAction(sequence);
    },
    button: function() {
        var self = this;
        self.majiang.on(cc.Node.EventType.TOUCH_END, function (event) {
            if(self.isOpen == 1)
            {
                self.isOpen = 0;
                self.currIndex ++;
                if(self.currIndex > self.fours.length - 1)
                {
                    self.currIndex = 0;
                }
                log(self.currIndex);
                self.move();
            }
        });
    },
    juli: function() {
        var juli = Math.abs(this.majiang.x - this.fours[this.currIndex].x);
        this.label.string = juli;
        return juli;
    },
    // use this for initialization
    onLoad: function () {
        this.isOpen = 1;
        var size = cc.winSize;
        let topPosition = cc.p(size.width/2, size.height - 100);
        let rightPosition = cc.p(0 + 100, size.height / 2);
        let bottomPosition = cc.p(size.width/2, 0 + 100);
        let leftPosition = cc.p(size.width - 100, size.height/2);
        this.fours = [topPosition,rightPosition,bottomPosition,leftPosition];
        this.majiang.position = this.fours[this.currIndex];
        this.button();
        
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var juli = this.juli();
    },
});
