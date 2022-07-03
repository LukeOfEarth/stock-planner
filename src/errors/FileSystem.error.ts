class FileSystemError extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, FileSystemError.prototype);
    }

    sayHello() {
        return "hello " + this.message;
    }
}