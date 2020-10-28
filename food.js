class Food {
    constructor() {

        var opt = {
            isStatic: true
        }

        this.body = Bodies.rectangle(50, 100, 5, 5, opt);
        this.image = loadImage("milk.png");

        World.add(world, this.body);
    }
    display() {

        var x = 80;
        var y = 100;

        var pos = this.body.position;
        imageMode(CENTER);
        image(this.image, 50, 100, 50, 50);

        if (foodStock != 0) {

            for (var i = 0; i < this.foodStock; i++) {

                if (i % 10 == 0) {

                    x = 50;
                    y = y + 20;

                }

                image(this.image, x, y, 50, 50);
                x += 30;

            }
        }
    }
}