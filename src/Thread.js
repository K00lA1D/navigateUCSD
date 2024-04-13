

class Thread {

    constructor(func, inputs) {
        this.func = func;
        this.inputs = inputs;
        this.onFinish = () => {}; // Default empty onFinish callback
    }

    run() {
        const result = this.func(...this.inputs);
        this.onFinish(result); // Emit signal with result
    }

    setOnFinish(callback) {
        this.onFinish = callback;
    }
}